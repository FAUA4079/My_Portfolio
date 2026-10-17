/* Shared progressive enhancement: navigation, URL state, tabs and native dialogs. */
(() => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.navbar-links');
  const closeNav = () => { navLinks?.classList.remove('open'); navToggle?.setAttribute('aria-expanded', 'false'); };
  navToggle?.addEventListener('click', () => navToggle.setAttribute('aria-expanded', String(navLinks.classList.toggle('open'))));
  navLinks?.addEventListener('click', closeNav);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });

  const tabs = [...document.querySelectorAll('[data-tab]')];
  const panels = [...document.querySelectorAll('.tab-content')];
  const dialogs = [...document.querySelectorAll('dialog')];
  const defaultTab = tabs[0]?.dataset.tab;
  let currentTab = defaultTab;
  let opener = null;
  const tabExists = id => tabs.some(button => button.dataset.tab === id);
  function selectTab(id) {
    currentTab = tabExists(id) ? id : defaultTab;
    tabs.forEach(button => {
      const selected = button.dataset.tab === currentTab;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    panels.forEach(panel => {
      const selected = panel.id === 'tab-' + currentTab;
      panel.classList.toggle('active', selected);
      panel.hidden = !selected;
    });
  }
  function writeHash(hash) {
    const url = new URL(location.href);
    url.hash = hash;
    if (url.href !== location.href) history.pushState({tab: currentTab}, '', url);
  }
  function fillProject(id) {
    const project = typeof projects === 'undefined' ? null : projects.find(p => String(p.id) === id);
    if (!project) return false;
    for (const [target, key] of [['projectModalTitle','title'],['modalGoal','goal'],['modalProblem','problem'],['modalSolution','solution']]) document.getElementById(target).textContent = project[key];
    const link = document.getElementById('projectModalLink');
    const url = new URL(project.link);
    if (url.protocol !== 'https:') return false;
    link.href = url.href;
    document.getElementById('projectModalTech').replaceChildren(...project.tech.map(text => {
      const span = document.createElement('span'); span.textContent = text; return span;
    }));
    return true;
  }
  function restore() {
    {
      dialogs.forEach(d => { if (d.open) d.close(); });
      const hash = location.hash.slice(1);
      const projectMatch = /^project-(\d+)$/.exec(hash);
      const ctfMatch = /^ctf-(\d+)$/.exec(hash);
      let dialog;
      if (projectMatch && fillProject(projectMatch[1])) {
        selectTab(tabExists(history.state?.tab) ? history.state.tab : defaultTab);
        dialog = document.getElementById('projectModal');
      } else if (ctfMatch && document.getElementById('ctf-modal-' + ctfMatch[1])) {
        selectTab('ctfs'); dialog = document.getElementById('ctf-modal-' + ctfMatch[1]);
      } else if (tabs.length) selectTab(hash);
      if (dialog) { dialog.showModal(); dialog.querySelector('button, a')?.focus(); }
      document.body.classList.toggle('dialog-open', !!dialog);
    }
  }
  function closeDialog(dialog) {
    if (!dialog.open) return;
    dialog.close();
    document.body.classList.remove('dialog-open');
    writeHash(currentTab === defaultTab ? '' : currentTab);
    if (opener?.isConnected && !opener.closest('[hidden]')) opener.focus();
    else tabs.find(t => t.dataset.tab === currentTab)?.focus();
    opener = null;
  }
  tabs.forEach((button, i) => {
    button.id = 'tab-button-' + button.dataset.tab;
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-controls', 'tab-' + button.dataset.tab);
    button.closest('.tab-nav').setAttribute('role','tablist');
    button.closest('.tab-nav').setAttribute('aria-label','Content categories');
    const panel = document.getElementById('tab-' + button.dataset.tab);
    panel.setAttribute('role','tabpanel'); panel.setAttribute('aria-labelledby', button.id);
    button.addEventListener('click', () => { selectTab(button.dataset.tab); writeHash(currentTab === defaultTab ? '' : currentTab); });
    button.addEventListener('keydown', e => {
      let next;
      if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
      if (e.key === 'ArrowLeft') next = (i + tabs.length - 1) % tabs.length;
      if (e.key === 'Home') next = 0;
      if (e.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { e.preventDefault(); tabs[next].click(); tabs[next].focus(); }
    });
  });
  document.addEventListener('click', e => {
    const trigger = e.target.closest('[data-modal], [data-project]');
    if (!trigger) return;
    opener = trigger;
    const hash = trigger.dataset.project ? 'project-' + trigger.dataset.project : trigger.dataset.modal.replace('ctf-modal-', 'ctf-');
    writeHash(hash); restore();
  });
  dialogs.forEach(dialog => {
    dialog.addEventListener('keydown', e => {
      if (e.key !== 'Tab') return;
      const focusable = [...dialog.querySelectorAll('button, a[href], [tabindex="0"]')].filter(el => !el.disabled && el.getClientRects().length);
      const first = focusable[0], last = focusable.at(-1);
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    dialog.querySelectorAll('[data-close-modal]').forEach(button => button.addEventListener('click', () => closeDialog(dialog)));
    dialog.addEventListener('cancel', e => { e.preventDefault(); closeDialog(dialog); });
    dialog.addEventListener('click', e => { if (e.target === dialog) closeDialog(dialog); });
  });
  window.addEventListener('popstate', restore);
  window.addEventListener('hashchange', restore);
  // Hide JS-only controls only after enhancement is ready.
  document.documentElement.classList.add('enhanced');
  restore();
})();
