        const blogsPerPage = 5;
        const tags = [...new Set(blogs.flatMap(blog => blog.tags))];
        let currentPage = 1;
        let currentTag = 'all';
        let sortAscending = false;
        const byNewest = (a, b) => Date.parse(b.date) - Date.parse(a.date) || b.id - a.id;
        // Compute globally, so filtering never labels an older article as NEW.
        const latestBlog = [...blogs].sort(byNewest)[0];
        const container = document.getElementById('blogContainer');

        function element(tag, className, text) {
            const node = document.createElement(tag);
            node.className = className;
            if (text !== undefined) node.textContent = text;
            return node;
        }

        function readUrl() {
            const params = new URLSearchParams(window.location.search);
            currentTag = tags.includes(params.get('tag')) ? params.get('tag') : 'all';
            const page = Number(params.get('page'));
            currentPage = Number.isSafeInteger(page) && page > 0 ? page : 1;
            sortAscending = params.get('sort') === 'asc';
        }

        function writeUrl(replace = false) {
            const url = new URL(window.location.href);
            currentTag === 'all' ? url.searchParams.delete('tag') : url.searchParams.set('tag', currentTag);
            currentPage === 1 ? url.searchParams.delete('page') : url.searchParams.set('page', String(currentPage));
            sortAscending ? url.searchParams.set('sort', 'asc') : url.searchParams.delete('sort');
            if (url.href !== window.location.href) {
                history[replace ? 'replaceState' : 'pushState'](null, '', url.href);
            }
        }

        function renderBlogs() {
            const filtered = blogs.filter(blog => currentTag === 'all' || blog.tags.includes(currentTag));
            filtered.sort((a, b) => sortAscending ? -byNewest(a, b) : byNewest(a, b));
            const totalPages = Math.max(1, Math.ceil(filtered.length / blogsPerPage));
            currentPage = Math.max(1, Math.min(currentPage, totalPages));
            container.replaceChildren();
            filtered.slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage).forEach(blog => {
                const isLatest = blog.id === latestBlog?.id;
                const row = element('article', 'blog-row animate-fade-in' + (isLatest ? ' is-latest' : ''));
                row.id = 'post-' + blog.id;
                const info = element('div', 'blog-info');
                const titleLine = element('div', 'blog-title-line');
                titleLine.append(element('span', 'blog-title', blog.title));
                if (isLatest) {
                    const badge = element('span', 'blog-new-badge', 'NEW');
                    badge.title = 'Latest published article';
                    titleLine.append(badge);
                }
                const meta = element('div', 'blog-meta');
                blog.tags.forEach(tag => meta.append(element('span', 'blog-tag-badge', tag)));
                const date = element('time', '', blog.date.slice(0, 10));
                date.dateTime = blog.date;
                meta.append(date);
                info.append(titleLine, meta);
                const link = element('a', 'btn-link-style blog-read-link', 'Read More →');
                link.href = blog.link;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                link.setAttribute('aria-label', 'Read ' + blog.title + ' (opens in a new tab)');
                row.append(info, link);
                container.append(row);
            });
            if (!filtered.length) container.append(element('p', '', 'No logs found for this tag.'));
            document.getElementById('pageIndicator').textContent = `Page ${currentPage} of ${totalPages}`;
            document.getElementById('prevBtn').disabled = currentPage === 1;
            document.getElementById('nextBtn').disabled = currentPage === totalPages;
            document.getElementById('sortToggle').textContent = sortAscending ? '↑ Oldest First' : '↓ Newest First';
            document.querySelectorAll('#tagFilters button').forEach(button => {
                const active = button.dataset.tag === currentTag;
                button.classList.toggle('active', active);
                button.setAttribute('aria-pressed', String(active));
            });
        }

        ['all', ...tags].forEach(tag => {
            const button = element('button', 'filter-btn', tag === 'all' ? 'All Tags' : tag);
            button.type = 'button';
            button.dataset.tag = tag;
            button.addEventListener('click', () => {
                currentTag = tag;
                currentPage = 1;
                renderBlogs();
                writeUrl();
            });
            document.getElementById('tagFilters').append(button);
        });

        document.getElementById('sortToggle').addEventListener('click', () => {
            sortAscending = !sortAscending;
            currentPage = 1;
            renderBlogs();
            writeUrl();
        });
        function changePage(direction) {
            currentPage += direction;
            renderBlogs();
            writeUrl();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        document.getElementById('prevBtn').addEventListener('click', () => changePage(-1));
        document.getElementById('nextBtn').addEventListener('click', () => changePage(1));
        window.addEventListener('popstate', () => {
            readUrl();
            renderBlogs();
        });

        readUrl();
        renderBlogs();
        writeUrl(true);
    