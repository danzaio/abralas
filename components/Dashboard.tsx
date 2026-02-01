"use client";

import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Calendar as CalendarIcon, MessageSquare, Users, Sparkles, ArrowRight, Flame, X, Search, Send, Zap } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { OriginalSigil } from '@/components/OriginalSigil';
import { TiltWrapper } from '@/components/TiltWrapper';

import grimoireData from '@/lib/data/grimoire.json';
import calendarData from '@/lib/data/calendar.json';
// Relatos data will be fetched or passed as initial prop, but for now we import static to initialize state if needed,
// though we'll fetch dynamic data. For this "less code" approach, we'll simulate fetching or use actions.
// import initialRelatosData from '@/lib/data/relatos.json';

import { joinRitual, submitStory, sendEnergy, getStories } from '@/lib/storage';
import { useRitualPresence } from '@/hooks/useRitual';

// --- Types ---
type SheetType = 'grimoire' | 'relatos' | null;
type DialogType = 'calendar' | 'collective' | null;

interface Story {
    id: string;
    name: string;
    email?: string;
    content: string;
    date: string;
    energy: number;
}

export default function Dashboard() {
    const [activeSheet, setActiveSheet] = useState<SheetType>(null);
    const [activeDialog, setActiveDialog] = useState<DialogType>(null);

    // Ritual State
    const [ritualMode, setRitualMode] = useState(false);
    const [particles, setParticles] = useState(0);
    const [isJoiningRitual, setIsJoiningRitual] = useState(false);

    // Grimoire Search
    const [grimoireSearch, setGrimoireSearch] = useState("");

    // Relatos State
    const [relatos, setRelatos] = useState<Story[]>([]);
    const [isRelatosLoading, setIsRelatosLoading] = useState(true);
    const [newStoryContent, setNewStoryContent] = useState("");
    const [newStoryName, setNewStoryName] = useState("");
    const [isSubmittingStory, setIsSubmittingStory] = useState(false);

    // Glitch Effect
    const [glitchActive, setGlitchActive] = useState(false);

    // Egrégora Counter (Realtime)
    const onlineCount = useRitualPresence();

    // --- Effects ---

    // Update particles when online count changes
    useEffect(() => {
        setParticles(onlineCount);
    }, [onlineCount]);

    // Initial Load
    useEffect(() => {
        const initData = async () => {
            const stories = await getStories();
            setRelatos(stories);
            setIsRelatosLoading(false);
        };
        initData();
    }, []);

    // Breathing Animation (Synched with CSS or Framer)
    // We'll use Framer Motion variants for the pulse

    // --- Logic ---

    const nextEvent = useMemo(() => {
        const now = new Date();
        const sorted = [...calendarData].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        const next = sorted.find(e => new Date(e.date) >= now);
        return next || sorted[0];
    }, []);

    const filteredGrimoire = useMemo(() => {
        if (!grimoireSearch) return grimoireData.sections;
        const lowerSearch = grimoireSearch.toLowerCase();
        return grimoireData.sections.filter(section =>
            section.title.toLowerCase().includes(lowerSearch) ||
            section.content?.toLowerCase().includes(lowerSearch) ||
            section.items?.some(item => item.toLowerCase().includes(lowerSearch))
        );
    }, [grimoireSearch]);

    const handleJoinRitual = async () => {
        setIsJoiningRitual(true);
        // Trigger Glitch
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 500); // 0.5s Glitch

        const res = await joinRitual();
        if (res.success && res.participants) {
            setParticles(res.participants);
            setTimeout(() => {
                setRitualMode(true);
                setIsJoiningRitual(false);
            }, 600); // Wait for glitch to finish
        } else {
            setIsJoiningRitual(false);
        }
    };

    const handleSubmitStory = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmittingStory(true);

        const formData = new FormData();
        formData.append('name', newStoryName);
        formData.append('content', newStoryContent);

        const res = await submitStory(formData);
        if (res.success && res.story) {
            setRelatos([res.story, ...relatos]);
            setNewStoryContent("");
            setNewStoryName("");
        }
        setIsSubmittingStory(false);
    };

    const handleSendEnergy = async (id: string) => {
        // Optimistic UI update
        setRelatos(prev => prev.map(story =>
            story.id === id ? { ...story, energy: story.energy + 1 } : story
        ));
        await sendEnergy(id);
    };

    return (
        <div className={`min-h-screen flex flex-col overflow-x-hidden cursor-none ${glitchActive ? 'animate-glitch bg-red-900/20' : ''}`}>

            {/* Background Ambience - Red/Gold */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-red-950/30 via-black to-black pointer-events-none z-0" />

            {/* Navbar / Header */}
            <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent backdrop-blur-[2px]">
                <div className="flex items-center gap-2">
                    <OriginalSigil className="w-8 h-8 text-red-600" />
                    <span className="font-bold tracking-widest text-sm text-zinc-400">ABRALAS</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2 text-xs font-mono text-red-500/80">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        {onlineCount} Conectados
                    </div>
                    <Badge variant="outline" className="border-red-900/50 text-red-500 text-[10px] uppercase tracking-widest">
                        Beta
                    </Badge>
                </div>
            </header>

            {/* Main Grid Layout - Smart Masonry */}
            <main className="relative z-10 w-full max-w-[1600px] mx-auto p-4 md:p-8 pt-20 flex-grow flex flex-col justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 auto-rows-[minmax(200px,auto)] w-full">

                    {/* 1. Hero / Sigil (Large) */}
                    <div className="col-span-1 md:col-span-2 lg:col-span-4 row-span-2">
                        <TiltWrapper className="h-full">
                            <Card className="h-full relative overflow-hidden group border-zinc-900 bg-zinc-950/60 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between p-8 md:p-16 transition-all hover:border-red-900/30 shadow-2xl shadow-black/50">
                                <div className="z-10 flex flex-col items-center md:items-start text-center md:text-left space-y-6 max-w-lg">
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white drop-shadow-xl">
                                            ABRALAS
                                        </h1>
                                        <p className="text-zinc-400 text-lg md:text-2xl font-light tracking-wide mt-4 border-l-2 border-red-600 pl-4">
                                            O Deus dos Caminhos.<br /> <span className="text-red-500 font-medium">O Agente da Fluidez.</span>
                                        </p>
                                        <div className="flex gap-3 mt-8 justify-center md:justify-start">
                                            <Button
                                                onClick={() => setActiveSheet('grimoire')}
                                                className="bg-red-700 hover:bg-red-600 text-white rounded-full px-8 py-6 text-lg font-semibold shadow-[0_0_20px_rgba(185,28,28,0.3)] transition-all hover:shadow-[0_0_30px_rgba(185,28,28,0.5)]"
                                            >
                                                Abrir Caminhos
                                            </Button>
                                        </div>
                                    </motion.div>
                                </div>

                                <div className="relative z-0 mt-12 md:mt-0 w-64 h-64 md:w-96 md:h-96 flex items-center justify-center opacity-80 mix-blend-screen pointer-events-none">
                                    <OriginalSigil className="w-full h-full text-red-600 drop-shadow-[0_0_80px_rgba(220,38,38,0.5)] animate-pulse-slow" />
                                </div>
                            </Card>
                        </TiltWrapper>
                    </div>

                    {/* 2. Calendar Tile */}
                    <Card
                        onClick={() => setActiveDialog('calendar')}
                        className="col-span-1 md:col-span-1 lg:col-span-2 row-span-1 p-6 border-zinc-900 bg-zinc-950/60 hover:bg-zinc-900 transition-all cursor-pointer group flex flex-col justify-between"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-red-500 flex items-center gap-2">
                                    <CalendarIcon className="w-3 h-3" /> Próximo Rito
                                </span>
                                <h3 className="text-3xl font-bold text-white mt-2 group-hover:text-red-500 transition-colors">
                                    {new Date(nextEvent.date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' }).replace('.', '')}
                                </h3>
                            </div>
                            <div className="text-right">
                                <span className="text-4xl font-black text-zinc-800 group-hover:text-zinc-700 transition-colors">{nextEvent.weekday.substring(0, 3).toUpperCase()}</span>
                            </div>
                        </div>
                        <p className="text-zinc-400 text-sm mt-4 font-medium truncate">{nextEvent.event}</p>
                    </Card>

                    {/* 3. Relatos Tile */}
                    <Card
                        onClick={() => setActiveSheet('relatos')}
                        className="col-span-1 md:col-span-1 lg:col-span-2 row-span-1 p-6 border-zinc-900 bg-zinc-950/60 hover:bg-zinc-900 transition-all cursor-pointer group flex flex-col justify-between"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-red-500" /> Relatos
                            </h2>
                            <ArrowRight className="w-5 h-5 text-zinc-700 group-hover:text-white transition-transform group-hover:translate-x-1" />
                        </div>
                        <p className="text-zinc-500 text-sm line-clamp-2 italic border-l-2 border-zinc-800 pl-3 group-hover:border-red-900 transition-colors">
                            "{relatos[0]?.content || '...'}"
                        </p>
                    </Card>

                    {/* 4. Grimoire Quick Access */}
                    <Card
                        onClick={() => setActiveSheet('grimoire')}
                        className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 p-6 border-zinc-900 bg-gradient-to-br from-zinc-950 to-red-950/10 hover:to-red-950/20 transition-all cursor-pointer group"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-red-500/10 rounded-full text-red-500 group-hover:scale-110 transition-transform">
                                <Book className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">Grimório</h2>
                                <p className="text-xs text-zinc-500">Conhecimento Sagrado</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Badge variant="secondary" className="bg-zinc-900 text-zinc-400 hover:text-white transition-colors">Velas</Badge>
                            <Badge variant="secondary" className="bg-zinc-900 text-zinc-400 hover:text-white transition-colors">Orações</Badge>
                        </div>
                    </Card>

                    {/* 5. Collective / Altar Tile */}
                    <Card
                        onClick={() => setActiveDialog('collective')}
                        className="col-span-1 md:col-span-2 lg:col-span-4 row-span-1 p-6 border-zinc-900 bg-zinc-950/60 hover:border-red-900/50 transition-all cursor-pointer group flex items-center justify-between"
                    >
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <div className="absolute inset-0 bg-red-600 blur-xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full" />
                                <Users className="w-10 h-10 text-zinc-200 relative z-10" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white group-hover:text-red-500 transition-colors">Coletivo ABRALAS</h2>
                                <p className="text-zinc-500">Conecte-se ao fluxo.</p>
                            </div>
                        </div>
                        <Button variant="ghost" className="text-zinc-400 hover:text-white hover:bg-zinc-900">
                            Entrar <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Card>

                </div>
            </main>

            {/* --- OVERLAYS --- */}

            <Sheet open={activeSheet === 'grimoire'} onOpenChange={(open) => !open && setActiveSheet(null)}>
                <SheetContent side="right" className="w-full sm:max-w-md border-l-zinc-900 bg-black text-zinc-100 p-0 flex flex-col">
                    <div className="p-6 border-b border-zinc-900 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-20">
                        <SheetHeader className="mb-4">
                            <SheetTitle className="text-3xl font-black flex items-center gap-3 text-white">
                                <Book className="w-6 h-6 text-red-600" />
                                Grimório
                            </SheetTitle>
                            <SheetDescription className="text-zinc-500">
                                O arquivo vivo de Abralas.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                            <Input
                                placeholder="Buscar conhecimento..."
                                className="pl-9 bg-zinc-900 border-zinc-800"
                                value={grimoireSearch}
                                onChange={(e) => setGrimoireSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <ScrollArea className="flex-1">
                        <div className="p-6">
                            <Accordion type="single" collapsible className="w-full space-y-2">
                                {filteredGrimoire.length > 0 ? filteredGrimoire.map((section, idx) => (
                                    <AccordionItem key={section.id} value={section.id} className="border border-zinc-900 bg-zinc-900/20 rounded-lg px-4 data-[state=open]:bg-zinc-900/40 data-[state=open]:border-red-900/50 transition-all">
                                        <AccordionTrigger className="hover:no-underline py-4">
                                            <div className="flex items-center gap-3 text-left">
                                                <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest">0{idx + 1}</span>
                                                <span className="text-lg font-semibold text-zinc-200 group-hover:text-white">{section.title}</span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="pb-4 text-zinc-400 leading-relaxed border-t border-zinc-900/50 pt-4 mt-2">
                                            {section.content && (
                                                <div className="whitespace-pre-line mb-4">{section.content}</div>
                                            )}
                                            {section.items && (
                                                <ul className="grid gap-2">
                                                    {section.items.map((item, i) => (
                                                        <li key={i} className="flex items-start gap-2 bg-black/20 p-2 rounded border border-white/5 text-sm">
                                                            <span className="text-red-500 mt-0.5">•</span>
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </AccordionContent>
                                    </AccordionItem>
                                )) : (
                                    <div className="text-center py-10 text-zinc-500">
                                        <p>Nenhum conhecimento encontrado.</p>
                                    </div>
                                )}
                            </Accordion>
                        </div>
                    </ScrollArea>
                </SheetContent>
            </Sheet>

            <Sheet open={activeSheet === 'relatos'} onOpenChange={(open) => !open && setActiveSheet(null)}>
                <SheetContent side="right" className="w-full sm:max-w-md border-l-zinc-900 bg-black text-zinc-100 p-0 flex flex-col">
                    <div className="p-6 border-b border-zinc-900 sticky top-0 bg-black z-20">
                        <SheetHeader>
                            <SheetTitle className="text-2xl font-bold flex items-center gap-3 text-white">
                                <MessageSquare className="w-6 h-6 text-red-600" />
                                Relatos
                            </SheetTitle>
                            <SheetDescription>Vozes da comunidade.</SheetDescription>
                        </SheetHeader>
                    </div>
                    <ScrollArea className="flex-1">
                        <div className="p-6 space-y-8">

                            {/* Submission Form */}
                            <div className="bg-zinc-900/30 border border-zinc-800 p-4 rounded-xl">
                                <h3 className="text-sm font-bold text-zinc-300 mb-3 uppercase tracking-wider">Deixe seu relato</h3>
                                <form onSubmit={handleSubmitStory} className="space-y-3">
                                    <Input
                                        placeholder="Seu nome (ou Anônimo)"
                                        className="bg-black/50 border-zinc-800"
                                        value={newStoryName}
                                        onChange={(e) => setNewStoryName(e.target.value)}
                                    />
                                    <textarea
                                        className="w-full min-h-[80px] rounded-md border border-zinc-800 bg-black/50 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-900 resize-y"
                                        placeholder="Compartilhe sua experiência..."
                                        value={newStoryContent}
                                        onChange={(e) => setNewStoryContent(e.target.value)}
                                    />
                                    <Button
                                        type="submit"
                                        disabled={isSubmittingStory || !newStoryContent}
                                        className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
                                    >
                                        {isSubmittingStory ? "Enviando..." : "Enviar Relato"}
                                    </Button>
                                </form>
                            </div>

                            <Separator className="bg-zinc-800" />

                            {/* Feed */}
                            <div className="space-y-4">
                                {isRelatosLoading ? (
                                    Array.from({ length: 3 }).map((_, i) => (
                                        <div key={i} className="space-y-2">
                                            <Skeleton className="h-4 w-1/3 bg-zinc-800" />
                                            <Skeleton className="h-20 w-full bg-zinc-800" />
                                        </div>
                                    ))
                                ) : (
                                    relatos.map(story => (
                                        <div key={story.id} className="relative pl-6 pb-6 border-l border-zinc-800 last:border-0 last:pb-0">
                                            <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-red-600 ring-4 ring-black" />
                                            <div className="bg-zinc-900/30 border border-zinc-800 p-5 rounded-xl hover:border-zinc-700 transition-colors group">
                                                <p className="text-zinc-300 italic mb-4 font-serif text-lg leading-relaxed">"{story.content}"</p>
                                                <div className="flex justify-between items-center">
                                                    <div className="text-xs text-zinc-500 font-mono uppercase tracking-wider flex flex-col">
                                                        <span className="font-bold text-red-400">{story.name}</span>
                                                        <span>{new Date(story.date).toLocaleDateString()}</span>
                                                    </div>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="text-zinc-500 hover:text-yellow-500 hover:bg-yellow-500/10 gap-1.5 h-8 px-2"
                                                        onClick={() => handleSendEnergy(story.id)}
                                                    >
                                                        <Zap className={`w-4 h-4 ${story.energy > 0 ? 'fill-current text-yellow-500' : ''}`} />
                                                        <span className="text-xs">{story.energy || 0}</span>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </ScrollArea>
                </SheetContent>
            </Sheet>

            <Dialog open={activeDialog === 'calendar'} onOpenChange={(open) => !open && setActiveDialog(null)}>
                <DialogContent className="bg-black border-zinc-900 text-zinc-100 max-w-lg max-h-[85vh] p-0 overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-zinc-900 bg-zinc-950/50">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-2xl font-bold text-white">
                                <CalendarIcon className="w-6 h-6 text-red-600" />
                                Calendário 2026
                            </DialogTitle>
                            <DialogDescription>Ciclos e Ritos Coletivos.</DialogDescription>
                        </DialogHeader>
                    </div>
                    <ScrollArea className="flex-1 p-6">
                        <div className="grid gap-3">
                            {calendarData.map((event, idx) => {
                                const isPast = new Date(event.date) < new Date();
                                return (
                                    <div key={idx} className={`flex items-stretch rounded-lg border overflow-hidden ${isPast ? 'border-zinc-900 opacity-50 grayscale' : 'border-zinc-800 bg-zinc-900/20'}`}>
                                        <div className={`w-20 flex flex-col items-center justify-center p-2 ${isPast ? 'bg-zinc-900 text-zinc-600' : 'bg-zinc-900 text-white'}`}>
                                            <span className="text-[10px] font-bold uppercase tracking-widest">{event.weekday.substring(0, 3)}</span>
                                            <span className="text-2xl font-black">{new Date(event.date).getDate()}</span>
                                            <span className="text-[10px] uppercase text-zinc-500">{new Date(event.date).toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')}</span>
                                        </div>
                                        <div className="flex-1 p-4 flex flex-col justify-center border-l border-zinc-800">
                                            <p className={`font-semibold ${isPast ? 'text-zinc-600' : 'text-zinc-200'}`}>{event.event}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className={`w-1.5 h-1.5 rounded-full ${isPast ? 'bg-zinc-700' : 'bg-red-500'}`} />
                                                <p className="text-xs text-zinc-500 font-mono">{event.time}h</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </ScrollArea>
                </DialogContent>
            </Dialog>

            <Dialog open={activeDialog === 'collective'} onOpenChange={(open) => {
                !open && setActiveDialog(null);
            }}>
                <DialogContent className="bg-zinc-950 border-zinc-900 text-zinc-100 max-w-full h-full md:h-[80vh] md:max-w-4xl p-0 overflow-hidden flex flex-col">
                    <DialogTitle className="sr-only">Rito Coletivo</DialogTitle>
                    <DialogDescription className="sr-only">Conexão com a Egrégora</DialogDescription>
                    {!ritualMode ? (
                        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-950/20 via-black to-black">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="mb-8"
                            >
                                <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                                    <div className="absolute inset-0 bg-red-600 blur-3xl opacity-20 animate-pulse-slow" />
                                    <OriginalSigil className="w-24 h-24 text-red-600 drop-shadow-[0_0_30px_rgba(220,38,38,0.6)]" />
                                </div>
                            </motion.div>

                            <h2 className="text-4xl font-black text-white mb-4 tracking-tight">Rito Coletivo</h2>
                            <p className="text-zinc-400 max-w-md text-lg leading-relaxed mb-10">
                                Entre no espaço sagrado digital. Sua presença fortalece a egrégora.
                            </p>

                            <Button
                                onClick={handleJoinRitual}
                                disabled={isJoiningRitual}
                                className="bg-red-600 hover:bg-red-700 text-white text-xl font-bold py-8 px-12 rounded-full shadow-[0_0_40px_rgba(220,38,38,0.4)] transition-all hover:scale-105"
                            >
                                {isJoiningRitual ? "CONECTANDO..." : "ENTRAR NO RITO"}
                            </Button>
                        </div>
                    ) : (
                        <div className="relative w-full h-full bg-black overflow-hidden flex items-center justify-center">
                            {/* Particles System (Polling) */}
                            {Array.from({ length: Math.min(particles, 100) }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-1 h-1 bg-red-500 rounded-full"
                                    initial={{
                                        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                                        y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                                        opacity: 0
                                    }}
                                    animate={{
                                        x: [null, Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)],
                                        y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000)],
                                        opacity: [0, 0.8, 0],
                                        scale: [0, 1.5, 0]
                                    }}
                                    transition={{
                                        duration: 3 + Math.random() * 5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: Math.random() * 2
                                    }}
                                />
                            ))}

                            {/* Synchronized Breathing Circle */}
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                animate={{ opacity: [0.1, 0.3, 0.1] }}
                                transition={{ duration: 12, times: [0, 0.33, 0.66, 1], repeat: Infinity, ease: "easeInOut" }} // 4-4-4 breathing logic roughly
                            >
                                <div className="w-[800px] h-[800px] bg-red-900/10 rounded-full blur-3xl" />
                            </motion.div>

                            {/* Central Sigil */}
                            <div className="relative z-10 text-center">
                                <motion.div
                                    animate={{
                                        rotate: 360,
                                        scale: [1, 1.05, 1]
                                    }}
                                    transition={{
                                        rotate: { duration: 60, repeat: Infinity, ease: "linear" },
                                        scale: { duration: 12, repeat: Infinity, ease: "easeInOut" } // Breathing pulse
                                    }}
                                    className="w-64 h-64 mx-auto mb-8 opacity-90"
                                >
                                    <OriginalSigil className="w-full h-full text-red-500 drop-shadow-[0_0_60px_rgba(220,38,38,0.8)]" />
                                </motion.div>
                                <motion.h2
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-3xl font-bold text-white tracking-widest uppercase"
                                >
                                    Conectado
                                </motion.h2>
                                <p className="text-red-500 mt-2 font-mono">
                                    {particles} Magistas Ativos
                                </p>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

        </div>
    );
}
