    const siteThemes=[
        {
            name: "StyleLab", 
            category: "Fashion & Apparel",
            others: "Alternative: TrendRack, The Edit, Wardrobe+)",
            colors: {
                "Primary": "Charcoal #2B2B2B",
                "Accent": "Hot Pink #FF2D55",
                "Neutral": "Off White #cec6c6",
                "Highlight": "Sand Beige #EBDDC3"
            },
            colorHex: {
                primary: "#2B2B2B",
                accent: "#FF2D55",
                neutral: "#FAFAFA",
                neutral2: "#cec6c6",
                background: "#FAFAFA",
                highlight: "#EBDDC3"
            },            
            summary: "Focuses on curated fashion, trends, and seasonal styles."
        },
        {
            name: "TechTrove", 
            category: "Tech & Electronics",
            others: "(Alternative: VoltSpace, GearGrid, PlugIn)",
            feels: "Sleek / Futuristic / High Contrast",
            colors: {
                "Primary": "Midnight Blue #0A0F3C",
                "Accent": "Neon Teal #00F6ED",
                "Neutral": "Graphite Gray #676767",
                "Highlight": "Ice Silver #E5E5E5"
            },
            colorHex: {
                primary: "#0A0F3C",
                accent: "#00F6ED",
                neutral: "#3C3C3C",
                neutral2: "#676767",
                background: "#E5E5E5",
                highlight: "#d2d3d3"
            },            
            summary: "Modern and sleek, implies innovation and cool gadgets."
        },
        {
            name: "GearGrid", 
            category: "Tech & Electronics",
            others: "(Alternative: VoltSpace, GearGrid, PlugIn)",
            feels: "Sleek / Futuristic / High Contrast",
            colors: {
                "Primary": "Dark Navy Blue  #202f41",
                "Accent": "Vibrant Blue  #2364a2",
                "Neutral": "Graphite Gray #394450",
                "Neutral2": "Graphite Gray #515c68",
                "background": "Graphite Gray #f2f2f2",
                "Highlight": "Ice Silver #d2d3d3"
            },
            colorHex: {
                primary: "#202f41",
                accent: "#2364a2",
                neutral: "#394450",
                neutral2: "#515c68",
                background: "#f2f2f2",
                highlight: "#d2d3d3"
            },
            summary: "Modern and sleek, implies innovation and cool gadgets."
        },
        {
            name: "Nest & Nook", 
            category: "Home & Living",
            others: "(Alternative: LivingHue, CozyCasa, Habitat HQ)",
            feels: "Warm / Minimal / Earthy",
            colors: {
                "Primary": "Clay Beige #D6C2B3",
                "Accent": "Forest Green #5A715B",
                "Neutral": "Linen White #F8F5F2",
                "Neutral2": "Linen White #ffffff",
                "Highlight": "Charcoal Gray #494949"
            },
            colorHex: {
                primary: "#D6C2B3",
                accent: "#5A715B",
                neutral: "#F8F5F2",
                neutral2: "#494949",
                background: "#ffffff",
                highlight: "#f1ad68"
            },
            summary: "A cozy, neutral palette that complements lifestyle visuals"
        },
        {
            name: "Pawfect", 
            category: "Home & Living",
            others: "(Alternative: Bark & Co, FurEver Goods, WhiskerMart)",
            feels: "Friendly / Trustworthy / Clean",
            colors: {
                "Primary": "Soft Sky Blue #AEE1F9",
                "Accent": "Golden Tan #F9C89B",
                "Accent2": "Golden Tan #f4943a",
                "Neutral": "Light Cream #FFFDF9",
                "Neutral22": "Light Cre #fffbf4F9",
                "Highlight": "Warm Gray #7D7D7D"
            },
            colorHex: {
                primary: "#AEE1F9",
                accent: "#F9C89B",
                neutral: "#FFFDF9",
                neutral2: "#7D7D7D",
                background: "#fffbf4F9",
                highlight: "#f4943a"
            },
            summary: "Playful, ideal for pet parents."
        },
        {
            name: "TasteDrop", 
            category: "Food & Beverage",
            others: "Alternative: CraveBox, YumMart, Flavorly",
            feels: "Fun / Appetite-Stimulating / Modern",
            colors: {
                "Primary": "Tomato Red #FF4D4D",
                "Accent": "Dijon Yellow #FDC500",
                "Neutral": "Warm Cream #FFF6E5",
                "Neutral2": "Warm Cream #a9a293",
                "Highlight": "Leafy Green #61C378"
            },
            colorHex: {
                primary: "#FF4D4D",
                accent: "#FDC500",
                neutral: "#FFF6E5",
                neutral2: "#a9a293",
                background: "#fffbf4F9",
                highlight: "#61C378"
            },
            summary: "Evokes flavor and freshness. Perfect for food brands"
        },
        {
            name: "GlowHaus", 
            category: "Beauty & Personal Care",
            others: "(Alternative: Blush & Bloom, SkinRx, Aura",
            feels: "Feminine / Soft Glow / Sleek",
            colors: {
                "Primary": "Blush Pink #F7D1D7",
                "Accent": "Mauve #C07FA6",
                "Neutral": "Light Taupe #EAE3DE",
                "Highlight": "Rose Gold #B76E79"
            },
            summary: "Clean, radiant, Instagram-worthy."
        },
        {
            name: "Bloom & Root", 
            category: "Plant hobby & Care",
            others: "(Alternative: Green Haven, Urban Sprout, Root & Rise",
            feels: "Vibe: Earthy, wholesome, and growth-oriented — for gardening supplies, seeds, and plant care.",
            colors: {
                "Primary": "Deep Plum (#4B2E5D)",
                "Accent": "Moss Green (#6B8E23)",
                "Highlight": "Coral Blush (#F88379)",
                "Neutral": "Cream (#FFF1E6)",
                "Neutral2": "Charcoal Gray (#333333)"
            },
            summary: "Creative hobbyists and nature enthusiasts."
        },
    ]
    const [themes, setThemes] = useState([
        {
            category: "Beauty & Personal Care", 
            themes: [
                {
                    "name": "Soft Luxe",
                    "vibe": "Elegant | Feminine | Premium",
                    "colors": {
                        "primary": "#F7E7E2",       // Blush Pink
                        "secondary": "#B76E79",     // Rose Gold
                        "accent": "#D7BFB4",        // Soft Taupe
                        "background": "#FFF8F3",    // Ivory
                        "text": "#5E423B"           // Deep Cocoa
                    },
                    "fonts": {
                        "heading": "Playfair Display",
                        "body": "Lato"
                    },
                    "textures": [
                        "soft silk fabric",
                        "subtle glitter overlay",
                        "watercolor floral wash"
                    ] 
                },
                {
                    "name": "Clean Glow",
                    "vibe": "Minimal | Natural | Wellness",
                    "colors": {
                        "primary": "#DCE1D7",       // Sage Green
                        "secondary": "#D3A38F",     // Terracotta
                        "accent": "#F7F4EF",        // Light Sand
                        "background": "#EDE9E3",    // White Clay
                        "text": "#3B3B3B"           // Charcoal
                    },
                    "fonts": {
                        "heading": "Poppins",
                        "body": "Work Sans"
                    },
                    "textures": [
                        "natural stone texture",
                        "linen fabric",
                        "light paper grain"
                    ]
                },
                {
                    "name": "Vibrant Pop",
                    "vibe": "Bold | Youthful | Trendy",
                    "colors": {
                        "primary": "#FF3E79",       // Hot Pink
                        "secondary": "#CDB4FF",     // Lavender
                        "accent": "#B6FCD5",        // Mint Green
                        "background": "#FFFFFF",    // White
                        "text": "#1C1C1C"           // Charcoal Black
                    },
                    "fonts": {
                        "heading": "Bebas Neue",
                        "body": "Montserrat"
                    },
                    "textures": [
                        "glossy plastic",
                        "neon glow accents",
                        "gradient abstract waves"
                    ]
                }
            ]
        }, 
        {
            cateogry: "Fashion & Apparel", 
            themse: [
                {
                    "name": "Modern Romance",
                    "vibe": "Soft | Feminine | Contemporary",
                    "colors": {
                        "primary": "#F3E8E6",       // Blush Pink
                        "secondary": "#D7A6A2",     // Muted Rose
                        "accent": "#A4606D",        // Dusty Plum (pop)
                        "background": "#FAF7F5",    // Shell White
                        "text": "#3E3A39"           // Soft Charcoal
                    },
                    "fonts": {
                        "heading": "DM Serif Display",
                        "body": "Lato"
                    },
                    "textures": [
                        "velvet fabric texture",
                        "soft gradient overlay",
                        "faded floral pattern"
                    ]
                },
                {
                    "name": "Muted Monochrome",
                    "vibe": "Minimal | Bold | Balanced",
                    "colors": {
                        "primary": "#E3E3E3",       // Light Dove Gray
                        "secondary": "#A6A6A6",     // Stone Gray
                        "accent": "#8EACCD",        // Muted Blue (pop)
                        "background": "#F7F7F7",    // Off-White
                        "text": "#2B2B2B"           // Charcoal Black
                    },
                    "fonts": {
                        "heading": "Space Grotesk",
                        "body": "Inter"
                    },
                    "textures": [
                        "brushed cotton",
                        "angled lines",
                        "contemporary mesh pattern"
                    ]
                },
                {
                    "name": "Earth & Bloom",
                    "vibe": "Natural | Subtle Color | Artistic",
                    "colors": {
                        "primary": "#F0EDE3",       // Cream Sand
                        "secondary": "#B4B295",     // Sage Taupe
                        "accent": "#C48793",        // Soft Berry (pop)
                        "background": "#FBFAF7",    // Light Beige
                        "text": "#484540"           // Deep Mushroom
                    },
                    "fonts": {
                        "heading": "Playfair Display",
                        "body": "Nunito"
                    },
                    "textures": [
                        "recycled paper texture",
                        "botanical ink illustrations",
                        "brushed canvas"
                    ]
                },
                {
                    "name": "Cool Edit",
                    "vibe": "Fresh | Clean | Editorial",
                    "colors": {
                        "primary": "#E8F1EE",       // Sage Mint
                        "secondary": "#C3CAD9",     // Lavender Gray
                        "accent": "#A5C9C1",        // Soft Teal (pop)
                        "background": "#FFFFFF",    // Clean White
                        "text": "#444444"           // Mid Charcoal
                    },
                    "fonts": {
                        "heading": "Syne",
                        "body": "Manrope"
                    },
                    "textures": [
                        "crisp cotton weave",
                        "glossy magazine layout texture",
                        "subtle grid or mesh overlay"
                    ]
                },
                {
                    "name": "Vibrant Pop",
                    "vibe": "Bold | Youthful | Trendy",
                    "colors": {
                        "primary": "#FF3E79",       // Hot Pink
                        "secondary": "#CDB4FF",     // Lavender
                        "accent": "#B6FCD5",        // Mint Green
                        "background": "#FFFFFF",    // White
                        "text": "#1C1C1C"           // Charcoal Black
                    },
                    "fonts": {
                        "heading": "Bebas Neue",
                        "body": "Montserrat"
                    },
                    "textures": [
                        "glossy plastic",
                        "neon glow accents",
                        "gradient abstract waves"
                    ]
                }
            ]
        },
        {
            cateogry: "Fashion & Apparel", 
            themes: [
                {
                    "name": "Retro Revival",
                    "vibe": "Vintage | Playful | Nostalgic",
                    "colors": {
                        "primary": "#F4C95D",       // Mustard Yellow
                        "secondary": "#E97451",     // Burnt Coral
                        "accent": "#5E5B52",        // Olive Charcoal
                        "background": "#FFF8E1",    // Warm Cream
                        "text": "#3B3028"           // Brown Black
                    },
                    "fonts": {
                        "heading": "Cooper Hewitt",
                        "body": "Quicksand"
                    },
                    "textures": [
                        "grainy paper",
                        "vintage denim fabric",
                        "retro geometric pattern"
                    ]
                },
                {
                    "name": "Luxe Mode",
                    "vibe": "Elegant | Polished | High-End",
                    "colors": {
                        "primary": "#D4C3A3",       // Champagne Gold
                        "secondary": "#4B3F3F",     // Deep Espresso
                        "accent": "#A28B6A",        // Taupe Gold
                        "background": "#FAF8F6",    // Soft Ivory
                        "text": "#2E2E2E"           // Jet Charcoal
                    },
                    "fonts": {
                        "heading": "Bodoni Moda",
                        "body": "Lora"
                    },
                    "textures": [
                        "marble surface",
                        "satin folds",
                        "embossed leather grain"
                    ]
                },
                {
                    "name": "Boho Spirit",
                    "vibe": "Free | Artistic | Earthy",
                    "colors": {
                        "primary": "#ca8b66",       // Terracotta Beige
                        "secondary": "#A26769",     // Clay Rose
                        "accent": "#7D9773",        // Moss Green
                        "background": "#F4F1EE",    // Off-White Sand
                        "text": "#453E3B"           // Warm Espresso
                    },
                    "fonts": {
                        "heading": "Marcellus",
                        "body": "Karla"
                    },
                    "textures": [
                        "handwoven fabric",
                        "botanical prints",
                        "sun-bleached linen"
                    ]
                },
                {
                    "name": "Urban Edge",
                    "vibe": "Bold | Cool | Streetwear",
                    "colors": {
                        "primary": "#1C1C1C",       // Jet Black
                        "secondary": "#A8A8A8",     // Cool Concrete
                        "accent": "#FF4848",        // Punch Red
                        "background": "#F0F0F0",    // Urban White
                        "text": "#222222"           // Ink Charcoal
                    },
                    "fonts": {
                        "heading": "Anton",
                        "body": "Poppins"
                    },
                    "textures": [
                        "grit concrete texture",
                        "spray paint details",
                        "oversized graphic patterns"
                    ]
                },
                {
                    "name": "Modern Ease",
                    "vibe": "Minimal | Calm | Clean",
                    "colors": {
                        "primary": "#E6E6E6",       // Soft Silver
                        "secondary": "#D0CFCF",     // Cloud Gray
                        "accent": "#A0C3D2",        // Muted Sky Blue
                        "background": "#FFFFFF",    // Pure White
                        "text": "#2C2C2C"           // Classic Black
                    },
                    "fonts": {
                        "heading": "Montserrat",
                        "body": "Work Sans"
                    },
                    "textures": [
                        "matte cotton texture",
                        "fine grid overlay",
                        "ultra-clean whitespace"
                    ]
                }
            ]
        },
        {
            category: "Tech & Electronics", 
            themes: [
                {
                    "name": "Neo Chrome",
                    "vibe": "Futuristic | Sleek | Metallic",
                    "colors": {
                        "primary": "#C5D1EB",       // Icy Chrome
                        "secondary": "#8A9AB9",     // Steel Blue
                        "accent": "#5BE7C4",        // Mint Neon Pop
                        "background": "#F4F6FA",    // Frost White
                        "text": "#2C2F36"           // Graphite
                    },
                    "fonts": {
                        "heading": "Orbitron",
                        "body": "Roboto"
                    },
                    "textures": [
                        "brushed aluminum",
                        "gradient holographic shimmer",
                        "smooth plastic shell"
                    ]
                },
                {
                "name": "Quantum Noir",
                "vibe": "Bold | High-Tech | Dark UI",
                "colors": {
                    "primary": "#1C1C1E",       // Deep Space Black
                    "secondary": "#343A40",     // Slate Gray
                    "accent": "#00F0FF",        // Cyan Electric Pop
                    "background": "#0D0D0D",    // Jet Black
                    "text": "#F2F2F2"           // Cool White
                },
                "fonts": {
                    "heading": "Rajdhani",
                    "body": "Inter"
                },
                "textures": [
                    "carbon fiber grid",
                    "subtle glitch overlay",
                    "matte black metal"
                ]
                },
                {
                "name": "Circuit Pulse",
                "vibe": "Energetic | Futuristic | Vibrant",
                "colors": {
                    "primary": "#ECEFF1",       // Soft Ice Gray
                    "secondary": "#90A4AE",     // Blue Gray
                    "accent": "#FF3CAC",        // Pink Magenta Pulse
                    "background": "#FDFDFD",    // Clean White
                    "text": "#212121"           // Deep Charcoal
                },
                "fonts": {
                    "heading": "Syncopate",
                    "body": "Helvetica Neue"
                },
                "textures": [
                    "neon circuit board lines",
                    "synthetic polymer weave",
                    "tech-inspired geometric pattern"
                ]
                },
                {
                "name": "Retro Pixel",
                "vibe": "Playful | Retro | Pixel Art",
                "colors": {
                    "primary": "#F9C22E",       // Neon Yellow
                    "secondary": "#F25287",     // Pink Coral
                    "accent": "#5D9CEC",        // Sky Blue Pop
                    "background": "#1F1F1F",    // Retro Black
                    "text": "#FFFFFF"           // Clean White
                },
                "fonts": {
                    "heading": "Press Start 2P",
                    "body": "VT323"
                },
                "textures": [
                    "pixel grid pattern",
                    "CRT scanlines",
                    "retro gaming screen texture"
                ]
                },
                {
                "name": "Space Core",
                "vibe": "Industrial | Sci-Fi | Cosmic",
                "colors": {
                    "primary": "#1E2A38",       // Cosmic Steel
                    "secondary": "#61707D",     // Space Slate
                    "accent": "#A48BE0",        // Cosmic Lavender
                    "background": "#EAEFF2",    // Ice Nebula
                    "text": "#1A1A1A"           // Shadow Gray
                },
                "fonts": {
                    "heading": "Audiowide",
                    "body": "Ubuntu"
                },
                "textures": [
                    "space dust grain",
                    "metal hatch pattern",
                    "faint nebula glow"
                ]
                }
            ]
        },
        {
            category: "Home & Living", 
            themes: [
                {
                    "name": "Scandi Minimalism",
                    "vibe": "Clean | Calm | Functional",
                    "colors": {
                        "primary": "#F4F4F4",       // Snow White
                        "secondary": "#D8D8D8",     // Pebble Gray
                        "accent": "#A8B2A1",        // Soft Sage
                        "background": "#FFFFFF",    // Crisp White
                        "text": "#2D2D2D"           // Charcoal
                    },
                    "fonts": {
                        "heading": "Work Sans",
                        "body": "Source Sans Pro"
                    },
                    "textures": [
                        "matte birch wood grain",
                        "natural linen fabric",
                        "light concrete finish"
                    ]
                },
                {
                    "name": "Art Deco Luxe",
                    "vibe": "Elegant | Glamorous | Geometric",
                    "colors": {
                        "primary": "#2D2D2D",       // Inkwell Black
                        "secondary": "#C5B358",     // Gold Foil
                        "accent": "#4A4E69",        // Deep Plum
                        "background": "#FAF4EC",    // Ivory Pearl
                        "text": "#1C1C1C"           // Rich Black
                    },
                    "fonts": {
                        "heading": "Cinzel",
                        "body": "Playfair Display"
                    },
                    "textures": [
                        "brushed gold foil",
                        "velvet upholstery",
                        "deco-style pattern"
                    ]
                },
                {
                    "name": "Mid-Century Modern",
                    "vibe": "Retro | Warm | Sophisticated",
                    "colors": {
                        "primary": "#EFD9B4",       // Honey Beige
                        "secondary": "#D98555",     // Amber Orange
                        "accent": "#64766B",        // Olive Green
                        "background": "#FFFDF8",    // Cream White
                        "text": "#3F3F3F"           // Graphite Gray
                    },
                    "fonts": {
                        "heading": "Josefin Sans",
                        "body": "Nunito"
                    },
                    "textures": [
                        "walnut wood grain",
                        "retro woven textile",
                        "brushed brass"
                    ]
                },
                {
                    "name": "Organic Earth",
                    "vibe": "Natural | Neutral | Soft",
                    "colors": {
                        "primary": "#EAE3D2",       // Sandstone Beige
                        "secondary": "#CBBFA2",     // Clay Taupe
                        "accent": "#8B9772",        // Moss Green
                        "background": "#FDFBF9",    // Bone White
                        "text": "#4A4A4A"           // Earth Charcoal
                    },
                    "fonts": {
                        "heading": "Cormorant Garamond",
                        "body": "Lora"
                    },
                    "textures": [
                        "recycled paper texture",
                        "raw cotton weave",
                        "ceramic matte finish"
                    ]
                },
                {
                    "name": "Urban Industrial",
                    "vibe": "Raw | Modern | Masculine",
                    "colors": {
                        "primary": "#2E2E2E",       // Steel Black
                        "secondary": "#787878",     // Iron Gray
                        "accent": "#C1643D",        // Rust Orange
                        "background": "#F2F2F2",    // Concrete White
                        "text": "#1A1A1A"           // Asphalt Black
                    },
                    "fonts": {
                        "heading": "Bebas Neue",
                        "body": "Open Sans"
                    },
                    "textures": [
                        "exposed concrete surface",
                        "rusted metal accents",
                        "distressed wood grain"
                    ]
                }
            ]
        }, 
        {
            category: "Beauty & Personal Care", 
            themes: [
                {
                    "name": "K-Beauty Glow",
                    "vibe": "Fresh | Youthful | Trendy",
                    "colors": {
                        "primary": "#FBEAF1",       // Soft Blush
                        "secondary": "#E1E7F2",     // Cloud Blue
                        "accent": "#FF7EB9",        // Bright Cherry Pink (pop)
                        "background": "#FFFFFF",    // Pure White
                        "text": "#3D3D3D"           // Cool Charcoal
                    },
                    "fonts": {
                        "heading": "DM Serif Display",
                        "body": "Noto Sans KR"
                    },
                    "textures": [
                        "glossy skincare packaging",
                        "soft gradient glow",
                        "frosted glass overlay"
                    ]
                },
                {
                    "name": "Clean Clinical Bright",
                    "vibe": "Minimal | Polished | Scientific",
                    "colors": {
                        "primary": "#EAF4F8",       // Hygienic Blue Tint
                        "secondary": "#D1DDE3",     // Neutral Ice Gray
                        "accent": "#4DD0E1",        // Bright Aqua Cyan (pop)
                        "background": "#FFFFFF",    // Clinical White
                        "text": "#2C2C2C"           // Deep Graphite
                    },
                    "fonts": {
                        "heading": "IBM Plex Sans",
                        "body": "Work Sans"
                    },
                    "textures": [
                        "clean gloss surface",
                        "lab-inspired linework",
                        "brushed chrome accents"
                    ]
                },
                {
                    "name": "Botanic Bright",
                    "vibe": "Earthy | Organic | Revitalizing",
                    "colors": {
                        "primary": "#F3F0E9",       // Soft Plant Cream
                        "secondary": "#B2C9A0",     // Light Leaf Green
                        "accent": "#7ED957",        // Fresh Lime Green (pop)
                        "background": "#FAFAF7",    // Canvas Off-White
                        "text": "#3F3F3F"           // Natural Bark
                    },
                    "fonts": {
                        "heading": "Playfair Display",
                        "body": "Inter"
                    },
                    "textures": [
                        "recycled kraft paper",
                        "textured plant-based packaging",
                        "pressed leaf imprints"
                    ]
                }
            ]
        },
        {
            category: "Pet Care & Supplies", 
            themes: [
                {
                    "name": "Playful Paws",
                    "vibe": "Energetic | Joyful | Bright",
                    "colors": {
                        "primary": "#FFF4DC",       // Soft Vanilla Cream
                        "secondary": "#E3E3E3",     // Neutral Mist Gray
                        "accent": "#FFA630",        // Sunny Orange Pop
                        "background": "#FFFFFF",    // Pure White
                        "text": "#3D3D3D"           // Deep Gray
                    },
                    "fonts": {
                        "heading": "Fredoka One",
                        "body": "Open Sans"
                    },
                    "textures": [
                        "rubber toy texture",
                        "polka dot pattern",
                        "soft foam mat finish"
                    ]
                },
                {
                    "name": "Rustic Tails",
                    "vibe": "Warm | Earthy | Natural",
                    "colors": {
                        "primary": "#E8E1D4",       // Linen Cream
                        "secondary": "#A07F5B",     // Rustic Tan
                        "accent": "#FF7B5A",        // Warm Coral Orange (pop)
                        "background": "#FAF8F4",    // Pale Sand
                        "text": "#4C4033"           // Barn Brown
                    },
                    "fonts": {
                        "heading": "Bitter",
                        "body": "Lora"
                    },
                    "textures": [
                        "reclaimed wood grain",
                        "natural jute weave",
                        "distressed canvas"
                    ]
                },
                {
                    "name": "Cozy Critters",
                    "vibe": "Cute | Soft | Comforting",
                    "colors": {
                        "primary": "#F7E6E1",       // Warm Blush
                        "secondary": "#D8CED8",     // Dusty Lavender
                        "accent": "#FF66A3",        // Playful Pink Pop
                        "background": "#FFFDFB",    // Cream White
                        "text": "#3F3F3F"           // Soft Graphite
                    },
                    "fonts": {
                        "heading": "Baloo 2",
                        "body": "Nunito"
                    },
                    "textures": [
                        "fuzzy fleece texture",
                        "knitted yarn pattern",
                        "soft cotton flannel"
                    ]
                }
            ]
        },
        {
            category: "Plant", 
            themes: [
                {
                    "name": "Tropical Paradise",
                    "vibe": "Vibrant | Lush | Exotic",
                    "colors": {
                        "primary": "#DFF5EA",       // Palm Mint
                        "secondary": "#98C1A3",     // Fern Green
                        "accent": "#FFA94D",        // Bright Mango (pop)
                        "background": "#FFFFFF",    // Tropical White
                        "text": "#2B3A2C"           // Jungle Charcoal
                    },
                    "fonts": {
                        "heading": "Pacifico",
                        "body": "Open Sans"
                    },
                    "textures": [
                        "banana leaf pattern",
                        "bamboo weave",
                        "tropical flower print"
                    ]
                },
                {
                    "name": "Zen Garden",
                    "vibe": "Calm | Minimal | Natural",
                    "colors": {
                        "primary": "#E8F1EB",       // Stone Green
                        "secondary": "#C6D4C1",     // Moss Sage
                        "accent": "#F48FB1",        // Lotus Pink (pop)
                        "background": "#FAFAF7",    // Tranquil Sand
                        "text": "#3E3E3E"           // Soft Stone Gray
                    },
                    "fonts": {
                        "heading": "Cormorant Garamond",
                        "body": "Work Sans"
                    },
                    "textures": [
                        "raked sand pattern",
                        "hand-thrown pottery",
                        "linen tatami texture"
                    ]
                },
                {
                    "name": "Vintage Glasshouse",
                    "vibe": "Classic | Botanical | Airy",
                    "colors": {
                        "primary": "#E4EFE7",       // Conservatory Mint
                        "secondary": "#B7CBB0",     // Vintage Leaf
                        "accent": "#FFC857",        // Sunlit Gold (pop)
                        "background": "#F9F8F6",    // Glasshouse Cream
                        "text": "#3B403E"           // Greenhouse Brown
                    },
                    "fonts": {
                        "heading": "Playfair Display",
                        "body": "Lato"
                    },
                    "textures": [
                        "antique glass ripple",
                        "brass frame edging",
                        "aged paper plant labels"
                    ]
                },
                {
                    "name": "Urban Jungle",
                    "vibe": "Modern | Bold | Lively",
                    "colors": {
                        "primary": "#DDE5DA",       // Cement Green
                        "secondary": "#8EAF94",     // Concrete Olive
                        "accent": "#00D1B2",        // Electric Teal (pop)
                        "background": "#F1F1F1",    // Urban White
                        "text": "#212121"           // Modern Charcoal
                    },
                    "fonts": {
                        "heading": "Montserrat",
                        "body": "Inter"
                    },
                    "textures": [
                        "polished cement surface",
                        "geometric leaf overlay",
                        "spray paint detail"
                    ]
                }
            ]
        }
    ])
    const themes22 = [
        {
            category: "Beauty & Personal Care", 
            themes: [
                {
                    "name": "Soft Luxe",
                    "vibe": "Elegant | Feminine | Premium",
                    "colors": {
                        "primary": "#F7E7E2",       // Blush Pink
                        "secondary": "#B76E79",     // Rose Gold
                        "accent": "#D7BFB4",        // Soft Taupe
                        "background": "#FFF8F3",    // Ivory
                        "text": "#5E423B"           // Deep Cocoa
                    },
                    "fonts": {
                        "heading": "Playfair Display",
                        "body": "Lato"
                    },
                    "textures": [
                        "soft silk fabric",
                        "subtle glitter overlay",
                        "watercolor floral wash"
                    ] 
                },
                {
                "name": "Clean Glow",
                "vibe": "Minimal | Natural | Wellness",
                "colors": {
                    "primary": "#DCE1D7",       // Sage Green
                    "secondary": "#D3A38F",     // Terracotta
                    "accent": "#F7F4EF",        // Light Sand
                    "background": "#EDE9E3",    // White Clay
                    "text": "#3B3B3B"           // Charcoal
                },
                "fonts": {
                    "heading": "Poppins",
                    "body": "Work Sans"
                },
                "textures": [
                    "natural stone texture",
                    "linen fabric",
                    "light paper grain"
                ]
                },
                {
                "name": "Vibrant Pop",
                "vibe": "Bold | Youthful | Trendy",
                "colors": {
                    "primary": "#FF3E79",       // Hot Pink
                    "secondary": "#CDB4FF",     // Lavender
                    "accent": "#B6FCD5",        // Mint Green
                    "background": "#FFFFFF",    // White
                    "text": "#1C1C1C"           // Charcoal Black
                },
                "fonts": {
                    "heading": "Bebas Neue",
                    "body": "Montserrat"
                },
                "textures": [
                    "glossy plastic",
                    "neon glow accents",
                    "gradient abstract waves"
                ]
                }
            ]
        }, 
        {
            cateogry: "Fashion & Apparel", 
            themse: [
                {
                "name": "Modern Romance",
                "vibe": "Soft | Feminine | Contemporary",
                "colors": {
                    "primary": "#F3E8E6",       // Blush Pink
                    "secondary": "#D7A6A2",     // Muted Rose
                    "accent": "#A4606D",        // Dusty Plum (pop)
                    "background": "#FAF7F5",    // Shell White
                    "text": "#3E3A39"           // Soft Charcoal
                },
                "fonts": {
                    "heading": "DM Serif Display",
                    "body": "Lato"
                },
                "textures": [
                    "velvet fabric texture",
                    "soft gradient overlay",
                    "faded floral pattern"
                ]
                },
                {
                "name": "Muted Monochrome",
                "vibe": "Minimal | Bold | Balanced",
                "colors": {
                    "primary": "#E3E3E3",       // Light Dove Gray
                    "secondary": "#A6A6A6",     // Stone Gray
                    "accent": "#8EACCD",        // Muted Blue (pop)
                    "background": "#F7F7F7",    // Off-White
                    "text": "#2B2B2B"           // Charcoal Black
                },
                "fonts": {
                    "heading": "Space Grotesk",
                    "body": "Inter"
                },
                "textures": [
                    "brushed cotton",
                    "angled lines",
                    "contemporary mesh pattern"
                ]
                },
                {
                "name": "Earth & Bloom",
                "vibe": "Natural | Subtle Color | Artistic",
                "colors": {
                    "primary": "#F0EDE3",       // Cream Sand
                    "secondary": "#B4B295",     // Sage Taupe
                    "accent": "#C48793",        // Soft Berry (pop)
                    "background": "#FBFAF7",    // Light Beige
                    "text": "#484540"           // Deep Mushroom
                },
                "fonts": {
                    "heading": "Playfair Display",
                    "body": "Nunito"
                },
                "textures": [
                    "recycled paper texture",
                    "botanical ink illustrations",
                    "brushed canvas"
                ]
                },
                {
                "name": "Cool Edit",
                "vibe": "Fresh | Clean | Editorial",
                "colors": {
                    "primary": "#E8F1EE",       // Sage Mint
                    "secondary": "#C3CAD9",     // Lavender Gray
                    "accent": "#A5C9C1",        // Soft Teal (pop)
                    "background": "#FFFFFF",    // Clean White
                    "text": "#444444"           // Mid Charcoal
                },
                "fonts": {
                    "heading": "Syne",
                    "body": "Manrope"
                },
                "textures": [
                    "crisp cotton weave",
                    "glossy magazine layout texture",
                    "subtle grid or mesh overlay"
                ]
                }
            ]
        },
        {
            cateogry: "Fashion & Apparel", 
            themes: [
                {
                "name": "Retro Revival",
                "vibe": "Vintage | Playful | Nostalgic",
                "colors": {
                    "primary": "#F4C95D",       // Mustard Yellow
                    "secondary": "#E97451",     // Burnt Coral
                    "accent": "#5E5B52",        // Olive Charcoal
                    "background": "#FFF8E1",    // Warm Cream
                    "text": "#3B3028"           // Brown Black
                },
                "fonts": {
                    "heading": "Cooper Hewitt",
                    "body": "Quicksand"
                },
                "textures": [
                    "grainy paper",
                    "vintage denim fabric",
                    "retro geometric pattern"
                ]
                },
                {
                "name": "Luxe Mode",
                "vibe": "Elegant | Polished | High-End",
                "colors": {
                    "primary": "#D4C3A3",       // Champagne Gold
                    "secondary": "#4B3F3F",     // Deep Espresso
                    "accent": "#A28B6A",        // Taupe Gold
                    "background": "#FAF8F6",    // Soft Ivory
                    "text": "#2E2E2E"           // Jet Charcoal
                },
                "fonts": {
                    "heading": "Bodoni Moda",
                    "body": "Lora"
                },
                "textures": [
                    "marble surface",
                    "satin folds",
                    "embossed leather grain"
                ]
                },
                {
                "name": "Boho Spirit",
                "vibe": "Free | Artistic | Earthy",
                "colors": {
                    "primary": "#D7B49E",       // Terracotta Beige
                    "secondary": "#A26769",     // Clay Rose
                    "accent": "#7D9773",        // Moss Green
                    "background": "#F4F1EE",    // Off-White Sand
                    "text": "#453E3B"           // Warm Espresso
                },
                "fonts": {
                    "heading": "Marcellus",
                    "body": "Karla"
                },
                "textures": [
                    "handwoven fabric",
                    "botanical prints",
                    "sun-bleached linen"
                ]
                },
                {
                "name": "Urban Edge",
                "vibe": "Bold | Cool | Streetwear",
                "colors": {
                    "primary": "#1C1C1C",       // Jet Black
                    "secondary": "#A8A8A8",     // Cool Concrete
                    "accent": "#FF4848",        // Punch Red
                    "background": "#F0F0F0",    // Urban White
                    "text": "#222222"           // Ink Charcoal
                },
                "fonts": {
                    "heading": "Anton",
                    "body": "Poppins"
                },
                "textures": [
                    "grit concrete texture",
                    "spray paint details",
                    "oversized graphic patterns"
                ]
                },
                {
                "name": "Modern Ease",
                "vibe": "Minimal | Calm | Clean",
                "colors": {
                    "primary": "#E6E6E6",       // Soft Silver
                    "secondary": "#D0CFCF",     // Cloud Gray
                    "accent": "#A0C3D2",        // Muted Sky Blue
                    "background": "#FFFFFF",    // Pure White
                    "text": "#2C2C2C"           // Classic Black
                },
                "fonts": {
                    "heading": "Montserrat",
                    "body": "Work Sans"
                },
                "textures": [
                    "matte cotton texture",
                    "fine grid overlay",
                    "ultra-clean whitespace"
                ]
                }
            ]
        },
        {
            category: "Tech & Electronics", 
            themes: [
                {
                    "name": "Neo Chrome",
                    "vibe": "Futuristic | Sleek | Metallic",
                    "colors": {
                        "primary": "#C5D1EB",       // Icy Chrome
                        "secondary": "#8A9AB9",     // Steel Blue
                        "accent": "#5BE7C4",        // Mint Neon Pop
                        "background": "#F4F6FA",    // Frost White
                        "text": "#2C2F36"           // Graphite
                    },
                    "fonts": {
                        "heading": "Orbitron",
                        "body": "Roboto"
                    },
                    "textures": [
                        "brushed aluminum",
                        "gradient holographic shimmer",
                        "smooth plastic shell"
                    ]
                },
                {
                "name": "Quantum Noir",
                "vibe": "Bold | High-Tech | Dark UI",
                "colors": {
                    "primary": "#1C1C1E",       // Deep Space Black
                    "secondary": "#343A40",     // Slate Gray
                    "accent": "#00F0FF",        // Cyan Electric Pop
                    "background": "#0D0D0D",    // Jet Black
                    "text": "#F2F2F2"           // Cool White
                },
                "fonts": {
                    "heading": "Rajdhani",
                    "body": "Inter"
                },
                "textures": [
                    "carbon fiber grid",
                    "subtle glitch overlay",
                    "matte black metal"
                ]
                },
                {
                "name": "Circuit Pulse",
                "vibe": "Energetic | Futuristic | Vibrant",
                "colors": {
                    "primary": "#ECEFF1",       // Soft Ice Gray
                    "secondary": "#90A4AE",     // Blue Gray
                    "accent": "#FF3CAC",        // Pink Magenta Pulse
                    "background": "#FDFDFD",    // Clean White
                    "text": "#212121"           // Deep Charcoal
                },
                "fonts": {
                    "heading": "Syncopate",
                    "body": "Helvetica Neue"
                },
                "textures": [
                    "neon circuit board lines",
                    "synthetic polymer weave",
                    "tech-inspired geometric pattern"
                ]
                },
                {
                "name": "Retro Pixel",
                "vibe": "Playful | Retro | Pixel Art",
                "colors": {
                    "primary": "#F9C22E",       // Neon Yellow
                    "secondary": "#F25287",     // Pink Coral
                    "accent": "#5D9CEC",        // Sky Blue Pop
                    "background": "#1F1F1F",    // Retro Black
                    "text": "#FFFFFF"           // Clean White
                },
                "fonts": {
                    "heading": "Press Start 2P",
                    "body": "VT323"
                },
                "textures": [
                    "pixel grid pattern",
                    "CRT scanlines",
                    "retro gaming screen texture"
                ]
                },
                {
                "name": "Space Core",
                "vibe": "Industrial | Sci-Fi | Cosmic",
                "colors": {
                    "primary": "#1E2A38",       // Cosmic Steel
                    "secondary": "#61707D",     // Space Slate
                    "accent": "#A48BE0",        // Cosmic Lavender
                    "background": "#EAEFF2",    // Ice Nebula
                    "text": "#1A1A1A"           // Shadow Gray
                },
                "fonts": {
                    "heading": "Audiowide",
                    "body": "Ubuntu"
                },
                "textures": [
                    "space dust grain",
                    "metal hatch pattern",
                    "faint nebula glow"
                ]
                }
            ]
        },
        {
            category: "Home & Living", 
            themes: [
                {
                    "name": "Scandi Minimalism",
                    "vibe": "Clean | Calm | Functional",
                    "colors": {
                        "primary": "#F4F4F4",       // Snow White
                        "secondary": "#D8D8D8",     // Pebble Gray
                        "accent": "#A8B2A1",        // Soft Sage
                        "background": "#FFFFFF",    // Crisp White
                        "text": "#2D2D2D"           // Charcoal
                    },
                    "fonts": {
                        "heading": "Work Sans",
                        "body": "Source Sans Pro"
                    },
                    "textures": [
                        "matte birch wood grain",
                        "natural linen fabric",
                        "light concrete finish"
                    ]
                },
                {
                    "name": "Art Deco Luxe",
                    "vibe": "Elegant | Glamorous | Geometric",
                    "colors": {
                        "primary": "#2D2D2D",       // Inkwell Black
                        "secondary": "#C5B358",     // Gold Foil
                        "accent": "#4A4E69",        // Deep Plum
                        "background": "#FAF4EC",    // Ivory Pearl
                        "text": "#1C1C1C"           // Rich Black
                    },
                    "fonts": {
                        "heading": "Cinzel",
                        "body": "Playfair Display"
                    },
                    "textures": [
                        "brushed gold foil",
                        "velvet upholstery",
                        "deco-style pattern"
                    ]
                },
                {
                    "name": "Mid-Century Modern",
                    "vibe": "Retro | Warm | Sophisticated",
                    "colors": {
                        "primary": "#EFD9B4",       // Honey Beige
                        "secondary": "#D98555",     // Amber Orange
                        "accent": "#64766B",        // Olive Green
                        "background": "#FFFDF8",    // Cream White
                        "text": "#3F3F3F"           // Graphite Gray
                    },
                    "fonts": {
                        "heading": "Josefin Sans",
                        "body": "Nunito"
                    },
                    "textures": [
                        "walnut wood grain",
                        "retro woven textile",
                        "brushed brass"
                    ]
                },
                {
                    "name": "Organic Earth",
                    "vibe": "Natural | Neutral | Soft",
                    "colors": {
                        "primary": "#EAE3D2",       // Sandstone Beige
                        "secondary": "#CBBFA2",     // Clay Taupe
                        "accent": "#8B9772",        // Moss Green
                        "background": "#FDFBF9",    // Bone White
                        "text": "#4A4A4A"           // Earth Charcoal
                    },
                    "fonts": {
                        "heading": "Cormorant Garamond",
                        "body": "Lora"
                    },
                    "textures": [
                        "recycled paper texture",
                        "raw cotton weave",
                        "ceramic matte finish"
                    ]
                },
                {
                    "name": "Urban Industrial",
                    "vibe": "Raw | Modern | Masculine",
                    "colors": {
                        "primary": "#2E2E2E",       // Steel Black
                        "secondary": "#787878",     // Iron Gray
                        "accent": "#C1643D",        // Rust Orange
                        "background": "#F2F2F2",    // Concrete White
                        "text": "#1A1A1A"           // Asphalt Black
                    },
                    "fonts": {
                        "heading": "Bebas Neue",
                        "body": "Open Sans"
                    },
                    "textures": [
                        "exposed concrete surface",
                        "rusted metal accents",
                        "distressed wood grain"
                    ]
                }
            ]
        }, 
        {
            category: "Beauty & Personal Care", 
            themes: [
                {
                    "name": "K-Beauty Glow",
                    "vibe": "Fresh | Youthful | Trendy",
                    "colors": {
                        "primary": "#FBEAF1",       // Soft Blush
                        "secondary": "#E1E7F2",     // Cloud Blue
                        "accent": "#FF7EB9",        // Bright Cherry Pink (pop)
                        "background": "#FFFFFF",    // Pure White
                        "text": "#3D3D3D"           // Cool Charcoal
                    },
                    "fonts": {
                        "heading": "DM Serif Display",
                        "body": "Noto Sans KR"
                    },
                    "textures": [
                        "glossy skincare packaging",
                        "soft gradient glow",
                        "frosted glass overlay"
                    ]
                },
                {
                    "name": "Clean Clinical Bright",
                    "vibe": "Minimal | Polished | Scientific",
                    "colors": {
                        "primary": "#EAF4F8",       // Hygienic Blue Tint
                        "secondary": "#D1DDE3",     // Neutral Ice Gray
                        "accent": "#4DD0E1",        // Bright Aqua Cyan (pop)
                        "background": "#FFFFFF",    // Clinical White
                        "text": "#2C2C2C"           // Deep Graphite
                    },
                    "fonts": {
                        "heading": "IBM Plex Sans",
                        "body": "Work Sans"
                    },
                    "textures": [
                        "clean gloss surface",
                        "lab-inspired linework",
                        "brushed chrome accents"
                    ]
                },
                {
                    "name": "Botanic Bright",
                    "vibe": "Earthy | Organic | Revitalizing",
                    "colors": {
                        "primary": "#F3F0E9",       // Soft Plant Cream
                        "secondary": "#B2C9A0",     // Light Leaf Green
                        "accent": "#7ED957",        // Fresh Lime Green (pop)
                        "background": "#FAFAF7",    // Canvas Off-White
                        "text": "#3F3F3F"           // Natural Bark
                    },
                    "fonts": {
                        "heading": "Playfair Display",
                        "body": "Inter"
                    },
                    "textures": [
                        "recycled kraft paper",
                        "textured plant-based packaging",
                        "pressed leaf imprints"
                    ]
                }
            ]
        },
        {
            category: "Pet Care & Supplies", 
            themes: [
                {
                    "name": "Playful Paws",
                    "vibe": "Energetic | Joyful | Bright",
                    "colors": {
                        "primary": "#FFF4DC",       // Soft Vanilla Cream
                        "secondary": "#E3E3E3",     // Neutral Mist Gray
                        "accent": "#FFA630",        // Sunny Orange Pop
                        "background": "#FFFFFF",    // Pure White
                        "text": "#3D3D3D"           // Deep Gray
                    },
                    "fonts": {
                        "heading": "Fredoka One",
                        "body": "Open Sans"
                    },
                    "textures": [
                        "rubber toy texture",
                        "polka dot pattern",
                        "soft foam mat finish"
                    ]
                },
                {
                    "name": "Rustic Tails",
                    "vibe": "Warm | Earthy | Natural",
                    "colors": {
                        "primary": "#E8E1D4",       // Linen Cream
                        "secondary": "#A07F5B",     // Rustic Tan
                        "accent": "#FF7B5A",        // Warm Coral Orange (pop)
                        "background": "#FAF8F4",    // Pale Sand
                        "text": "#4C4033"           // Barn Brown
                    },
                    "fonts": {
                        "heading": "Bitter",
                        "body": "Lora"
                    },
                    "textures": [
                        "reclaimed wood grain",
                        "natural jute weave",
                        "distressed canvas"
                    ]
                },
                {
                    "name": "Cozy Critters",
                    "vibe": "Cute | Soft | Comforting",
                    "colors": {
                        "primary": "#F7E6E1",       // Warm Blush
                        "secondary": "#D8CED8",     // Dusty Lavender
                        "accent": "#FF66A3",        // Playful Pink Pop
                        "background": "#FFFDFB",    // Cream White
                        "text": "#3F3F3F"           // Soft Graphite
                    },
                    "fonts": {
                        "heading": "Baloo 2",
                        "body": "Nunito"
                    },
                    "textures": [
                        "fuzzy fleece texture",
                        "knitted yarn pattern",
                        "soft cotton flannel"
                    ]
                }
            ]
        },
        {
            category: "Plant", 
            themes: [
                {
                    "name": "Tropical Paradise",
                    "vibe": "Vibrant | Lush | Exotic",
                    "colors": {
                        "primary": "#DFF5EA",       // Palm Mint
                        "secondary": "#98C1A3",     // Fern Green
                        "accent": "#FFA94D",        // Bright Mango (pop)
                        "background": "#FFFFFF",    // Tropical White
                        "text": "#2B3A2C"           // Jungle Charcoal
                    },
                    "fonts": {
                        "heading": "Pacifico",
                        "body": "Open Sans"
                    },
                    "textures": [
                        "banana leaf pattern",
                        "bamboo weave",
                        "tropical flower print"
                    ]
                },
                {
                    "name": "Zen Garden",
                    "vibe": "Calm | Minimal | Natural",
                    "colors": {
                        "primary": "#E8F1EB",       // Stone Green
                        "secondary": "#C6D4C1",     // Moss Sage
                        "accent": "#F48FB1",        // Lotus Pink (pop)
                        "background": "#FAFAF7",    // Tranquil Sand
                        "text": "#3E3E3E"           // Soft Stone Gray
                    },
                    "fonts": {
                        "heading": "Cormorant Garamond",
                        "body": "Work Sans"
                    },
                    "textures": [
                        "raked sand pattern",
                        "hand-thrown pottery",
                        "linen tatami texture"
                    ]
                },
                {
                    "name": "Vintage Glasshouse",
                    "vibe": "Classic | Botanical | Airy",
                    "colors": {
                        "primary": "#E4EFE7",       // Conservatory Mint
                        "secondary": "#B7CBB0",     // Vintage Leaf
                        "accent": "#FFC857",        // Sunlit Gold (pop)
                        "background": "#F9F8F6",    // Glasshouse Cream
                        "text": "#3B403E"           // Greenhouse Brown
                    },
                    "fonts": {
                        "heading": "Playfair Display",
                        "body": "Lato"
                    },
                    "textures": [
                        "antique glass ripple",
                        "brass frame edging",
                        "aged paper plant labels"
                    ]
                },
                {
                    "name": "Urban Jungle",
                    "vibe": "Modern | Bold | Lively",
                    "colors": {
                        "primary": "#DDE5DA",       // Cement Green
                        "secondary": "#8EAF94",     // Concrete Olive
                        "accent": "#00D1B2",        // Electric Teal (pop)
                        "background": "#F1F1F1",    // Urban White
                        "text": "#212121"           // Modern Charcoal
                    },
                    "fonts": {
                        "heading": "Montserrat",
                        "body": "Inter"
                    },
                    "textures": [
                        "polished cement surface",
                        "geometric leaf overlay",
                        "spray paint detail"
                    ]
                }
            ]
        }
    ]