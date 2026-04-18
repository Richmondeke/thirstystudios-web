export interface StudioGear {
    category: string;
    items: string[];
}

export interface Studio {
    id: string;
    name: string;
    description: string;
    longDescription: string;
    image: string;
    gallery: string[];
    gear: string[];
    detailedGear: StudioGear[];
    specs: string[];
}

export const studios: Studio[] = [
    {
        id: "music-studio",
        name: "Music Studio",
        description: "The best room for recording and mixing. Top-tier gear like the UAD Apollo and Yamaha HS8 monitors to help you make professional music in total privacy.",
        longDescription: "Built for local and international artists who need high-quality sound. With professional acoustic treatment and elite gear, it's the ideal space for recording vocals, mixing tracks, or producing your next hit.",
        image: "/images/studio-a.png",
        gallery: ["/images/studio-a.png", "/images/gear-1.png", "/images/gear-2.png"],
        gear: [
            "UAD Apollo Twin X",
            "SE Electronics Z5609a II",
            "Yamaha HS8 Monitors",
            "SE Electronics Z5600a II Pre-Amp",
            "Arturia Keylab 49 MK II",
            "Universal Audio Volt 276",
            "Behringer UMC202HD"
        ],
        detailedGear: [
            {
                category: "Soundcards",
                items: ["UAD Apollo Twin X", "Universal Audio Volt 276", "Behringer U-phoria UMC202HD"]
            },
            {
                category: "Pre Amp",
                items: ["SE Electronics Z5600a II Pre-Amp"]
            },
            {
                category: "Microphone",
                items: ["SE Electronics Z5609a II Microphone"]
            },
            {
                category: "Studio Speakers",
                items: ["Yamaha HS8 Monitor Speakers"]
            },
            {
                category: "Keyboard",
                items: ["Arturia Keylab 49 MK II"]
            }
        ],
        specs: [
            "Floating Floor Isolation",
            "Custom Acoustic Diffusion",
            "Professional Air Conditioning",
            "5 Guest Maximum Capacity"
        ]
    },
    {
        id: "photo-studio",
        name: "Photo Studio",
        description: "A large open space for professional photography and video. We provide pro lighting, backdrops, and plenty of room to bring your vision to life.",
        longDescription: "With a 28ft x 17ft floor plan, our Photo Studio gives you the freedom to shoot anything from fashion and portraits to music videos. Fully climate-controlled with pro lighting systems for top-tier results.",
        image: "/images/studios/Photostudio.jpg",
        gallery: ["/images/studios/Photostudio.jpg", "/images/photo-1.png", "/images/photo-2.png"],
        gear: ["Selected Backdrops", "Professional Softboxes", "Tripods", "28ft x 17ft Space"],
        detailedGear: [
            {
                category: "Lighting",
                items: ["Professional Softboxes", "Continuous Lighting", "Flash Systems"]
            },
            {
                category: "Production",
                items: ["Assorted Backdrops", "Reflectors", "Diffusers"]
            },
            {
                category: "Support",
                items: ["Heavy Duty Tripods", "C-Stands", "Sandbags"]
            }
        ],
        specs: [
            "28ft x 17ft Infinite Wall",
            "Climate Controlled Space",
            "Makeup & Dressing Area",
            "High-Speed Wi-Fi"
        ]
    }
];

export const getStudioById = (id: string) => {
    return studios.find(s => s.id === id);
};
