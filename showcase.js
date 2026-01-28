 // Character Data
        const characters = [
            {
                id: 1,
                name: "SOPHIA LAURENT",
                subtitle: "Haute Couture Ambassador",
                mainImage: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&h=610&fit=crop",
                buttonImage: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&fit=crop",
                quote: "Style is a way to say who you are without speaking",
                gif1: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=120&h=70&fit=crop",
                gif2: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=120&h=70&fit=crop",
                gif3: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=120&h=70&fit=crop",
                description: "International supermodel and fashion icon. Featured in Vogue, Harper's Bazaar, and Elle. Known for her elegant runway presence and timeless style.",
                gallery1: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=120&h=85&fit=crop",
                gallery2: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&h=85&fit=crop"
            },
            {
                id: 2,
                name: "ALEXANDER KING",
                subtitle: "Men's Fashion Icon",
                mainImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=610&fit=crop",
                buttonImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop",
                quote: "Fashion is about dressing according to what's fashionable",
                gif1: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=120&h=70&fit=crop",
                gif2: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=120&h=70&fit=crop",
                gif3: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=120&h=70&fit=crop",
                description: "Leading male model and style influencer. Represents luxury brands worldwide. Master of both classic tailoring and contemporary streetwear.",
                gallery1: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&h=85&fit=crop",
                gallery2: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=120&h=85&fit=crop"
            },
            {
                id: 3,
                name: "ISABELLA ROSE",
                subtitle: "Luxury Brand Ambassador",
                mainImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=610&fit=crop",
                buttonImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop",
                quote: "Elegance is the only beauty that never fades",
                gif1: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=120&h=70&fit=crop",
                gif2: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=120&h=70&fit=crop",
                gif3: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=120&h=70&fit=crop",
                description: "Premier fashion model and brand representative. Embodies sophistication and grace. Regular feature at Paris and Milan Fashion Weeks.",
                gallery1: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&h=85&fit=crop",
                gallery2: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=85&fit=crop"
            },
            {
                id: 4,
                name: "MARCUS STEEL",
                subtitle: "Contemporary Fashion Leader",
                mainImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=610&fit=crop",
                buttonImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
                quote: "Style is knowing who you are and what you want to say",
                gif1: "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=120&h=70&fit=crop",
                gif2: "https://images.unsplash.com/photo-1564564244660-5d73c057f2d2?w=120&h=70&fit=crop",
                gif3: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=120&h=70&fit=crop",
                description: "Award-winning model and fashion trendsetter. Known for bold choices and innovative style. Face of multiple international campaigns.",
                gallery1: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=85&fit=crop",
                gallery2: "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=120&h=85&fit=crop"
            },
            {
                id: 5,
                name: "VALENTINA CRUZ",
                subtitle: "Editorial Fashion Star",
                mainImage: "https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=500&h=610&fit=crop",
                buttonImage: "https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=80&h=80&fit=crop",
                quote: "Fashion is architecture: it is a matter of proportions",
                gif1: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=120&h=70&fit=crop",
                gif2: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=120&h=70&fit=crop",
                gif3: "https://images.unsplash.com/photo-1494726161322-5360d4d0eeae?w=120&h=70&fit=crop",
                description: "Rising star in high fashion editorial. Celebrated for versatility and photogenic presence. Regular collaborator with top photographers.",
                gallery1: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=120&h=85&fit=crop",
                gallery2: "https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=120&h=85&fit=crop"
            }
        ];

        let currentCharacterIndex = 0;

        // Initialize
        function init() {
            renderButtons();
            displayCharacter(0);
        }

        // Render Navigation Buttons
        function renderButtons() {
            const navButtons = document.getElementById('navButtons');
            navButtons.innerHTML = characters.map((char, index) => `
                <div class="character-btn ${index === 0 ? 'active' : ''}" 
                     onclick="displayCharacter(${index})"
                     style="background-image: url('${char.buttonImage}')">
                    <span class="tooltip-text">${char.name.split(' ')[0]}</span>
                </div>
            `).join('');
        }

        // Display Character
        function displayCharacter(index) {
            currentCharacterIndex = index;
            const char = characters[index];

            // Update main image
            document.getElementById('mainCharacterImage').style.backgroundImage = `url('${char.mainImage}')`;

            // Update quote
            document.getElementById('quoteText').innerHTML = `"${char.quote}"`;

            // Update GIFs
            document.getElementById('gif1').style.backgroundImage = `url('${char.gif1}')`;
            document.getElementById('gif2').style.backgroundImage = `url('${char.gif2}')`;
            document.getElementById('gif3').style.backgroundImage = `url('${char.gif3}')`;

            // Update info box
            document.getElementById('infoTitle').textContent = char.name;
            document.getElementById('infoSubtitle').textContent = char.subtitle;
            document.getElementById('infoText').innerHTML = `
                <p>${char.description}</p>
                <p style="margin-top: 15px; text-align: center;">
                    <a href="#" onclick="openDetailModal(${index}); return false;" 
                       style="color: var(--accent); text-decoration: underline; cursor: pointer;">
                        View Full Profile
                    </a>
                </p>
            `;

            // Update active button
            document.querySelectorAll('.character-btn').forEach((btn, i) => {
                btn.classList.toggle('active', i === index);
            });
        }

        // Open Detail Modal
        function openDetailModal(index) {
            const char = characters[index];
            const modal = document.getElementById('detailModal');

            document.getElementById('modalHeaderImage').style.backgroundImage = `url('${char.mainImage}')`;
            document.getElementById('modalTitle').textContent = char.name;
            document.getElementById('modalGallery').innerHTML = `
                <div class="gallery-img" style="background-image: url('${char.gallery1}')"></div>
                <div class="gallery-img" style="background-image: url('${char.gallery2}')"></div>
            `;
            document.getElementById('modalDescription').innerHTML = `
                <p style="font-style: italic; color: var(--accent); margin-bottom: 15px;">"${char.quote}"</p>
                <p>${char.description}</p>
            `;

            modal.classList.add('active');
        }

        // Close Detail Modal
        function closeDetailModal() {
            document.getElementById('detailModal').classList.remove('active');
        }

        // Close modal on outside click
        window.addEventListener('click', function(e) {
            const modal = document.getElementById('detailModal');
            if (e.target === modal) {
                closeDetailModal();
            }
        });

        // Initialize on load
        window.addEventListener('load', init);