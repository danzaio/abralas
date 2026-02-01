
const RITUAL_KEY = 'abralas-ritual-state';
const RELATOS_KEY = 'abralas-relatos';

// Initial "seed" stories so it's not empty
const INITIAL_RELATOS = [
    {
        id: 'init-1',
        name: 'Sistema',
        content: 'O Grimório está aberto. Suas memórias são guardadas neste dispositivo.',
        date: new Date().toISOString(),
        energy: 0
    }
];

export async function getStories() {
    if (typeof window === 'undefined') return INITIAL_RELATOS;
    const stored = localStorage.getItem(RELATOS_KEY);
    return stored ? JSON.parse(stored) : INITIAL_RELATOS;
}

export async function submitStory(formData: FormData) {
    if (typeof window === 'undefined') return { success: false, error: 'Server side' };

    const name = formData.get('name') as string || 'Anônimo';
    const content = formData.get('content') as string;

    if (!content) return { success: false, error: 'Conteúdo obrigatório' };

    const newStory = {
        id: Date.now().toString(),
        name,
        email: 'anon@abralas.com',
        content,
        date: new Date().toISOString(),
        energy: 0
    };

    const stored = localStorage.getItem(RELATOS_KEY);
    const relatos = stored ? JSON.parse(stored) : INITIAL_RELATOS;

    relatos.unshift(newStory);
    localStorage.setItem(RELATOS_KEY, JSON.stringify(relatos));

    return { success: true, story: newStory };
}

export async function sendEnergy(storyId: string) {
    if (typeof window === 'undefined') return { success: false, error: 'Server side' };

    const stored = localStorage.getItem(RELATOS_KEY);
    const relatos = stored ? JSON.parse(stored) : INITIAL_RELATOS;

    const storyIndex = relatos.findIndex((s: any) => s.id === storyId);
    if (storyIndex === -1) return { success: false, error: 'Story not found' };

    relatos[storyIndex].energy = (relatos[storyIndex].energy || 0) + 1;
    localStorage.setItem(RELATOS_KEY, JSON.stringify(relatos));

    return { success: true, energy: relatos[storyIndex].energy };
}

// Client-side simulation for ritual joining
export async function joinRitual() {
    if (typeof window === 'undefined') return { success: false };

    // Just a visual success
    return { success: true, participants: 0 };
}
