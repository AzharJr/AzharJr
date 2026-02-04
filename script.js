// Movie Link Manager - JavaScript

class MovieManager {
    constructor() {
        this.movies = JSON.parse(localStorage.getItem('movies')) || [];
        this.currentFilter = 'all';
        this.searchTerm = '';
        
        this.initializeElements();
        this.bindEvents();
        this.renderMovies();
        this.loadSampleData();
    }

    initializeElements() {
        this.movieForm = document.getElementById('movieForm');
        this.moviesList = document.getElementById('moviesList');
        this.searchInput = document.getElementById('searchInput');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.modal = document.getElementById('playerModal');
        this.videoPlayer = document.getElementById('videoPlayer');
        this.modalTitle = document.getElementById('modalTitle');
        this.copyLinkBtn = document.getElementById('copyLinkBtn');
        this.shareBtn = document.getElementById('shareBtn');
        this.closeBtn = document.querySelector('.close');
    }

    bindEvents() {
        // Form submission
        this.movieForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        
        // Search functionality
        this.searchInput.addEventListener('input', (e) => this.handleSearch(e));
        
        // Filter buttons
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilter(e));
        });
        
        // Modal events
        this.closeBtn.addEventListener('click', () => this.closeModal());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });
        
        // Copy and share buttons
        this.copyLinkBtn.addEventListener('click', () => this.copyLink());
        this.shareBtn.addEventListener('click', () => this.shareMovie());
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.movieForm);
        const movie = {
            id: Date.now(),
            title: formData.get('title'),
            link: formData.get('link'),
            category: formData.get('category'),
            description: formData.get('description'),
            dateAdded: new Date().toISOString()
        };

        this.addMovie(movie);
        this.movieForm.reset();
        this.showMessage('Film berhasil ditambahkan!', 'success');
    }

    addMovie(movie) {
        this.movies.unshift(movie);
        this.saveToLocalStorage();
        this.renderMovies();
    }

    deleteMovie(id) {
        if (confirm('Apakah Anda yakin ingin menghapus film ini?')) {
            this.movies = this.movies.filter(movie => movie.id !== id);
            this.saveToLocalStorage();
            this.renderMovies();
            this.showMessage('Film berhasil dihapus!', 'success');
        }
    }

    handleSearch(e) {
        this.searchTerm = e.target.value.toLowerCase();
        this.renderMovies();
    }

    handleFilter(e) {
        // Remove active class from all buttons
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        e.target.classList.add('active');
        
        this.currentFilter = e.target.dataset.category;
        this.renderMovies();
    }

    renderMovies() {
        let filteredMovies = this.movies;

        // Apply search filter
        if (this.searchTerm) {
            filteredMovies = filteredMovies.filter(movie =>
                movie.title.toLowerCase().includes(this.searchTerm) ||
                movie.description.toLowerCase().includes(this.searchTerm)
            );
        }

        // Apply category filter
        if (this.currentFilter !== 'all') {
            filteredMovies = filteredMovies.filter(movie =>
                movie.category === this.currentFilter
            );
        }

        if (filteredMovies.length === 0) {
            this.moviesList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-film"></i>
                    <h3>Tidak ada film ditemukan</h3>
                    <p>${this.searchTerm || this.currentFilter !== 'all' ? 'Coba ubah filter atau kata kunci pencarian' : 'Tambahkan film pertama Anda!'}</p>
                </div>
            `;
            return;
        }

        this.moviesList.innerHTML = filteredMovies.map(movie => this.createMovieCard(movie)).join('');
    }

    createMovieCard(movie) {
        const categoryLabels = {
            'action': 'Action',
            'drama': 'Drama',
            'comedy': 'Comedy',
            'horror': 'Horror',
            'romance': 'Romance',
            'sci-fi': 'Sci-Fi',
            'documentary': 'Documentary',
            'other': 'Lainnya'
        };

        return `
            <div class="movie-card" data-id="${movie.id}">
                <div class="movie-thumbnail">
                    <i class="fas fa-play"></i>
                </div>
                <div class="movie-info">
                    <h3 class="movie-title">${this.escapeHtml(movie.title)}</h3>
                    <span class="movie-category">${categoryLabels[movie.category] || movie.category}</span>
                    <p class="movie-description">${this.escapeHtml(movie.description || 'Tidak ada deskripsi')}</p>
                    <div class="movie-actions">
                        <button class="btn btn-primary" onclick="movieManager.playMovie(${movie.id})">
                            <i class="fas fa-play"></i> Putar
                        </button>
                        <button class="btn btn-secondary" onclick="movieManager.editMovie(${movie.id})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-secondary" onclick="movieManager.deleteMovie(${movie.id})">
                            <i class="fas fa-trash"></i> Hapus
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    playMovie(id) {
        const movie = this.movies.find(m => m.id === id);
        if (!movie) return;

        this.modalTitle.textContent = movie.title;
        
        // Check if it's an M3U8 file
        if (movie.link.includes('.m3u8')) {
            this.videoPlayer.innerHTML = `
                <source src="${movie.link}" type="application/x-mpegURL">
                Browser Anda tidak mendukung pemutaran video HLS.
            `;
        } else {
            // For other video formats or external links
            this.videoPlayer.innerHTML = `
                <source src="${movie.link}" type="video/mp4">
                <p>Video tidak dapat diputar. <a href="${movie.link}" target="_blank">Buka link</a></p>
            `;
        }

        this.modal.style.display = 'block';
        this.currentMovie = movie;
        
        // Try to load the video
        this.videoPlayer.load();
    }

    closeModal() {
        this.modal.style.display = 'none';
        this.videoPlayer.pause();
        this.currentMovie = null;
    }

    copyLink() {
        if (!this.currentMovie) return;
        
        navigator.clipboard.writeText(this.currentMovie.link).then(() => {
            this.showMessage('Link berhasil disalin ke clipboard!', 'success');
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = this.currentMovie.link;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showMessage('Link berhasil disalin!', 'success');
        });
    }

    shareMovie() {
        if (!this.currentMovie) return;
        
        if (navigator.share) {
            navigator.share({
                title: this.currentMovie.title,
                text: this.currentMovie.description || 'Tonton film ini!',
                url: this.currentMovie.link
            });
        } else {
            this.copyLink();
        }
    }

    editMovie(id) {
        const movie = this.movies.find(m => m.id === id);
        if (!movie) return;

        // Populate form with movie data
        document.getElementById('movieTitle').value = movie.title;
        document.getElementById('movieLink').value = movie.link;
        document.getElementById('movieCategory').value = movie.category;
        document.getElementById('movieDescription').value = movie.description || '';

        // Remove the old movie
        this.deleteMovie(id);
        
        // Scroll to form
        document.querySelector('.add-movie-section').scrollIntoView({ behavior: 'smooth' });
        
        this.showMessage('Film siap diedit!', 'info');
    }

    saveToLocalStorage() {
        localStorage.setItem('movies', JSON.stringify(this.movies));
    }

    showMessage(message, type = 'info') {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;

        // Insert at the top of main content
        const mainContent = document.querySelector('.main-content');
        mainContent.insertBefore(messageDiv, mainContent.firstChild);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    loadSampleData() {
        // Only load sample data if no movies exist
        if (this.movies.length === 0) {
            const sampleMovies = [
                {
                    id: 1,
                    title: "Contoh Film Action",
                    link: "https://example.com/movie1.m3u8",
                    category: "action",
                    description: "Film action seru dengan adegan yang menegangkan",
                    dateAdded: new Date().toISOString()
                },
                {
                    id: 2,
                    title: "Contoh Film Drama",
                    link: "https://example.com/movie2.m3u8",
                    category: "drama",
                    description: "Film drama yang mengharukan dan penuh makna",
                    dateAdded: new Date().toISOString()
                }
            ];

            this.movies = sampleMovies;
            this.saveToLocalStorage();
            this.renderMovies();
        }
    }

    // Export movies to JSON
    exportMovies() {
        const dataStr = JSON.stringify(this.movies, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'movies.json';
        link.click();
        
        URL.revokeObjectURL(url);
    }

    // Import movies from JSON
    importMovies(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedMovies = JSON.parse(e.target.result);
                this.movies = [...this.movies, ...importedMovies];
                this.saveToLocalStorage();
                this.renderMovies();
                this.showMessage(`${importedMovies.length} film berhasil diimpor!`, 'success');
            } catch (error) {
                this.showMessage('Error: File tidak valid', 'error');
            }
        };
        reader.readAsText(file);
    }
}

// Initialize the application
let movieManager;

document.addEventListener('DOMContentLoaded', () => {
    movieManager = new MovieManager();
    
    // Add export/import functionality
    const exportBtn = document.createElement('button');
    exportBtn.className = 'btn btn-secondary';
    exportBtn.innerHTML = '<i class="fas fa-download"></i> Export';
    exportBtn.onclick = () => movieManager.exportMovies();
    
    const importBtn = document.createElement('button');
    importBtn.className = 'btn btn-secondary';
    importBtn.innerHTML = '<i class="fas fa-upload"></i> Import';
    importBtn.onclick = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            if (e.target.files[0]) {
                movieManager.importMovies(e.target.files[0]);
            }
        };
        input.click();
    };
    
    // Add buttons to the movies section
    const moviesSection = document.querySelector('.movies-section');
    const buttonContainer = document.createElement('div');
    buttonContainer.style.marginBottom = '20px';
    buttonContainer.style.display = 'flex';
    buttonContainer.style.gap = '10px';
    buttonContainer.appendChild(exportBtn);
    buttonContainer.appendChild(importBtn);
    
    moviesSection.insertBefore(buttonContainer, moviesSection.querySelector('h2').nextSibling);
});

// Add some utility functions to global scope for easy access
window.movieManager = movieManager;