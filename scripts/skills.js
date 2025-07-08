// Skills page specific functionality
(function() {
    'use strict';

    // Animate skill bars when they come into view
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const skillObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const targetWidth = progressBar.getAttribute('data-width');
                    
                    // Add animation delay for staggered effect
                    const allBars = Array.from(skillBars);
                    const index = allBars.indexOf(progressBar);
                    
                    setTimeout(() => {
                        progressBar.style.width = targetWidth + '%';
                        
                        // Add percentage counter animation
                        const percentElement = progressBar.parentElement.nextElementSibling;
                        if (percentElement && percentElement.classList.contains('skill-percent')) {
                            animatePercentage(percentElement, targetWidth);
                        }
                    }, index * 100);
                    
                    skillObserver.unobserve(progressBar);
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        });

        skillBars.forEach(bar => {
            bar.style.width = '0%'; // Start from 0
            skillObserver.observe(bar);
        });
    }

    // Animate percentage numbers
    function animatePercentage(element, targetValue) {
        let currentValue = 0;
        const increment = targetValue / 50; // 50 steps for smooth animation
        
        function updatePercentage() {
            currentValue += increment;
            if (currentValue < targetValue) {
                element.textContent = Math.floor(currentValue) + '%';
                requestAnimationFrame(updatePercentage);
            } else {
                element.textContent = targetValue + '%';
            }
        }
        
        updatePercentage();
    }

    // Add hover effects to skill items
    function addSkillHoverEffects() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.02)';
                this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
                
                // Animate the progress bar on hover
                const progressBar = this.querySelector('.skill-progress');
                if (progressBar) {
                    progressBar.style.backgroundImage = 'linear-gradient(45deg, var(--text-primary), var(--text-secondary))';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
                
                const progressBar = this.querySelector('.skill-progress');
                if (progressBar) {
                    progressBar.style.backgroundImage = '';
                }
            });
        });
    }

    // Add interactive skill category filtering
    function addSkillFiltering() {
        // Create filter buttons if they don't exist
        const skillsSection = document.querySelector('.skills-overview');
        if (!skillsSection) return;

        const filterContainer = document.createElement('div');
        filterContainer.className = 'skill-filters';
        filterContainer.innerHTML = `
            <div class="filter-buttons">
                <button class="filter-btn active" data-filter="all">All Skills</button>
                <button class="filter-btn" data-filter="programming">Programming</button>
                <button class="filter-btn" data-filter="web">Web Tech</button>
                <button class="filter-btn" data-filter="tools">Tools</button>
                <button class="filter-btn" data-filter="soft">Soft Skills</button>
            </div>
        `;

        skillsSection.insertBefore(filterContainer, skillsSection.firstChild);

        // Add CSS for filter buttons
        const filterStyle = document.createElement('style');
        filterStyle.textContent = `
            .skill-filters {
                margin-bottom: 3rem;
                text-align: center;
            }
            
            .filter-buttons {
                display: flex;
                justify-content: center;
                gap: 1rem;
                flex-wrap: wrap;
            }
            
            .filter-btn {
                padding: 0.5rem 1rem;
                border: 2px solid var(--border-color);
                background: var(--bg-secondary);
                color: var(--text-secondary);
                border-radius: var(--border-radius);
                cursor: pointer;
                transition: var(--transition);
                font-weight: 500;
            }
            
            .filter-btn:hover,
            .filter-btn.active {
                border-color: var(--text-primary);
                background: var(--text-primary);
                color: var(--bg-primary);
                transform: translateY(-2px);
            }
            
            .skill-category {
                transition: opacity 0.3s ease, transform 0.3s ease;
            }
            
            .skill-category.hidden {
                opacity: 0;
                transform: scale(0.95);
                pointer-events: none;
            }
        `;
        document.head.appendChild(filterStyle);

        // Add click handlers for filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        const skillCategories = document.querySelectorAll('.skill-category');

        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter skill categories
                skillCategories.forEach(category => {
                    const categoryType = getCategoryType(category);
                    
                    if (filter === 'all' || categoryType === filter) {
                        category.classList.remove('hidden');
                    } else {
                        category.classList.add('hidden');
                    }
                });

                // Scroll to the first visible skill category after filtering
                setTimeout(() => {
                    const firstVisibleCategory = document.querySelector('.skill-category:not(.hidden)');
                    if (firstVisibleCategory) {
                        firstVisibleCategory.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                            inline: 'nearest'
                        });
                    }
                }, 100); // Small delay to ensure DOM updates are complete
            });
        });
    }

    // Helper function to determine category type
    function getCategoryType(category) {
        const title = category.querySelector('h2').textContent.toLowerCase();
        
        if (title.includes('programming')) return 'programming';
        if (title.includes('web')) return 'web';
        if (title.includes('tools') || title.includes('frameworks')) return 'tools';
        if (title.includes('soft')) return 'soft';
        
        return 'other';
    }

    // Add skill level indicators
    function addSkillLevelIndicators() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach(item => {
            const percentElement = item.querySelector('.skill-percent');
            if (percentElement) {
                const percentage = parseInt(percentElement.textContent);
                let level = '';
                let levelClass = '';
                
                if (percentage >= 85) {
                    level = 'Expert';
                    levelClass = 'expert';
                } else if (percentage >= 70) {
                    level = 'Advanced';
                    levelClass = 'advanced';
                } else if (percentage >= 50) {
                    level = 'Intermediate';
                    levelClass = 'intermediate';
                } else {
                    level = 'Beginner';
                    levelClass = 'beginner';
                }
                
                const levelIndicator = document.createElement('span');
                levelIndicator.className = `skill-level ${levelClass}`;
                levelIndicator.textContent = level;
                
                item.querySelector('.skill-info').appendChild(levelIndicator);
            }
        });

        // Add CSS for skill levels
        const levelStyle = document.createElement('style');
        levelStyle.textContent = `
            .skill-level {
                display: inline-block;
                padding: 0.2rem 0.5rem;
                border-radius: 12px;
                font-size: 0.7rem;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-top: 0.5rem;
            }
            
            .skill-level.expert {
                background: #10b981;
                color: white;
            }
            
            .skill-level.advanced {
                background: #3b82f6;
                color: white;
            }
            
            .skill-level.intermediate {
                background: #f59e0b;
                color: white;
            }
            
            .skill-level.beginner {
                background: #ef4444;
                color: white;
            }
        `;
        document.head.appendChild(levelStyle);
    }

    // Add skill comparison feature
    function addSkillComparison() {
        const skillItems = document.querySelectorAll('.skill-item');
        let selectedSkills = [];
        
        skillItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                
                if (this.classList.contains('selected')) {
                    this.classList.remove('selected');
                    selectedSkills = selectedSkills.filter(skill => skill !== this);
                } else if (selectedSkills.length < 3) {
                    this.classList.add('selected');
                    selectedSkills.push(this);
                }
                
                updateComparisonView();
            });
        });

        // Add CSS for selection
        const selectionStyle = document.createElement('style');
        selectionStyle.textContent = `
            .skill-item.selected {
                border: 2px solid var(--text-primary);
                background: var(--bg-primary);
                transform: translateY(-3px);
            }
            
            .skill-item {
                cursor: pointer;
            }
            
            .comparison-view {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: var(--bg-secondary);
                border: 1px solid var(--border-color);
                border-radius: var(--border-radius);
                padding: 1rem;
                box-shadow: var(--shadow-hover);
                max-width: 300px;
                z-index: 1000;
                transition: var(--transition);
            }
            
            .comparison-view.hidden {
                transform: translateY(100%);
                opacity: 0;
            }
        `;
        document.head.appendChild(selectionStyle);

        function updateComparisonView() {
            let comparisonView = document.querySelector('.comparison-view');
            
            if (selectedSkills.length === 0) {
                if (comparisonView) {
                    comparisonView.classList.add('hidden');
                }
                return;
            }
            
            if (!comparisonView) {
                comparisonView = document.createElement('div');
                comparisonView.className = 'comparison-view';
                document.body.appendChild(comparisonView);
            }
            
            comparisonView.classList.remove('hidden');
            
            let content = '<h4>Skill Comparison</h4>';
            selectedSkills.forEach(skill => {
                const name = skill.querySelector('h3').textContent;
                const percentage = skill.querySelector('.skill-percent').textContent;
                content += `<div>${name}: ${percentage}</div>`;
            });
            
            content += `<button onclick="clearSkillSelection()">Clear</button>`;
            comparisonView.innerHTML = content;
        }

        // Global function to clear selection
        window.clearSkillSelection = function() {
            selectedSkills.forEach(skill => skill.classList.remove('selected'));
            selectedSkills = [];
            updateComparisonView();
        };
    }

    // Initialize all skills functionality
    function initSkills() {
        if (document.querySelector('.skills-overview')) {
            animateSkillBars();
            addSkillHoverEffects();
            addSkillFiltering();
            addSkillLevelIndicators();
            addSkillComparison();
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSkills);
    } else {
        initSkills();
    }

})();
