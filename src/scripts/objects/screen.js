const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        // PROFILE INFO
        this.userProfile.innerHTML = `<div class="info">
                                        <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                                        <div class="data">
                                            <h1>${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
                                            <p>${user.bio ?? 'Não possui bio cadastrada 😢'}</p>
                                         </div>
                                     </div>
                                     <div class="counters">
                                            <h2>👥 Seguidores: ${user.followers} 👥 Seguindo: ${user.following}</h2>
                                     </div>`
        // REPOSITORIES
        if (user.repositories.length > 0) {
            let repositoriesItens = ''
            user.repositories.forEach(repo => repositoriesItens += ` <li>
                                                                        <a href="${repo.html_url}" target="_blank">
                                                                            <h4>${repo.name}</h4>
                                                                            <i class="forks">🍴 ${repo.forks_count}</i>
                                                                            <i class="stars">⭐ ${repo.stargazers_count}</i>
                                                                            <i class="watchers">👀 ${repo.watchers_count}</i>
                                                                            <i class="language">👨‍💻 ${repo.language}</i>
                                                                        </a>
                                                                     </li>`)
            this.userProfile.innerHTML += ` <div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                            </div>`
        }
        // EVENTS
        if (user.events.length > 0) {
            let eventsItens = ''
            user.events.forEach(event => {
                if (event.payload && event.payload.commits) {
                    const commits = event.payload.commits
                    const commitsMessages = commits.map(commit => `<span>${commit.message}</span>`)

                    eventsItens += `<li><strong>${event.repo.name}:</strong> ${commitsMessages}</li>`
                }
            })

        this.userProfile.innerHTML += ` <div class="events section">
                                                <h2>Eventos</h2>
                                                <ul>${eventsItens}</ul>
                                            </div>`
    }
},
    renderNotFound() {
        this.userProfile.innerHTML = '<h3>Usuário não encontrado</h3>'
    }
}

export { screen }