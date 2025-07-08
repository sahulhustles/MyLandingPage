
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", mobileMenu);

        function mobileMenu() {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        }

        const navLink = document.querySelectorAll(".nav-link");

        navLink.forEach(n => n.addEventListener("click", closeMenu));

        function closeMenu() {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }
    }
});

// Download CV functionality
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('download-cv-btn');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Create a temporary CV content (you can replace this with actual CV data)
            const cvContent = `
SAHUL HAMEED
Computer Science Engineering Student
Email: sahulhustler@gmail.com
LinkedIn: https://www.linkedin.com/in/sahul-hameed-83b2a3293/
GitHub: https://github.com/sahulhustles

EDUCATION:
• B.E Computer Science Engineering - Sri Krishna College of Technology, Coimbatore (2023 - Present)
• Grade 12 - SMBM National Public School, Dindigul (2020-2023) - 76.8%

SKILLS:
• Programming: C++, Java, JavaScript, HTML, CSS
• Technologies: React, AWS, Docker, REST API, DBMS
• Tools: Git, GitHub

PROJECTS:
1. REST API with SpringBoot (Java)
2. AI Business Plan Generator (Python, Streamlit)
3. Simple Calculator (JavaScript)

CERTIFICATIONS:
View all certifications: https://github.com/sahulhustles/Learnings.git

SERVICES:
• Image Editing
• PDF Manipulations  
• Audio/Video Editing
• Web Development
            `;
            
            // Create and download the file
            const blob = new Blob([cvContent], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Sahul_Hameed_CV.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            
            // Optional: Show success message
            console.log('CV downloaded successfully!');
        });
    }
});
