// ============================================================
// ChatWave — App Logic  (jQuery + vanilla JS)
// ============================================================

$(function () {

  // ── State ──────────────────────────────────────────────
  let currentUser  = { name: 'Priya Kumar', avatar: AVATARS[0] };
  let activeId     = null;
  let callInterval = null;
  let callSeconds  = 0;

  // ── AVATAR PICKER ──────────────────────────────────────
  AVATARS.forEach((av, i) => {
    const $opt = $('<div>')
      .addClass('avatar-opt' + (i === 0 ? ' selected' : ''))
      .css('background', av.bg)
      .text(av.emoji)
      .attr('title', av.seed)
      .on('click', function () {
        $('.avatar-opt').removeClass('selected');
        $(this).addClass('selected');
        currentUser.avatar = av;
      });
    $('#avatarOptions').append($opt);
  });

  // ── LOGIN ──────────────────────────────────────────────
  $('#loginBtn').on('click', doLogin);
  $('#loginName').on('keydown', e => { if (e.key === 'Enter') doLogin(); });

  function doLogin() {
    const name = $('#loginName').val().trim();
    if (!name) {
      $('#loginName').addClass('is-invalid');
      return;
    }
    currentUser.name = name;

    // Animate login → app
    $('#loginScreen').fadeOut(400, function () {
      $('#chatApp').removeClass('d-none').hide().fadeIn(400);
      init();
    });
  }

  // ── INIT APP ───────────────────────────────────────────
  function init() {
    // Set user info
    $('#myNameSidebar').text(currentUser.name);
    $('#myAvatarSidebar')
      .css('background', currentUser.avatar.bg)
      .text(currentUser.avatar.emoji);

    renderContacts(CONTACTS);
    updateUnreadTotal();
  }

  // ── RENDER CONTACT LIST ────────────────────────────────
  function renderContacts(list) {
    $('#contactList').empty();
    list.forEach(c => {
      const lastMsg  = c.messages.length ? c.messages[c.messages.length - 1] : null;
      const preview  = lastMsg ? lastMsg.text.replace(/\n/g, ' ').substring(0, 36) + (lastMsg.text.length > 36 ? '…' : '') : 'No messages yet';
      const timeStr  = lastMsg ? lastMsg.time : '';

      const $item = $('<div>').addClass('contact-item').attr('data-id', c.id);
      if (c.id === activeId) $item.addClass('active');

      const statusClass = {
        online: 'status-online', away: 'status-away',
        offline: 'status-offline', group: 'status-group'
      }[c.status] || 'status-offline';

      $item.html(`
        <div class="contact-avatar" style="background:${c.avatar.bg}">
          ${c.avatar.emoji}
          <span class="status-ring ${statusClass}"></span>
        </div>
        <div class="contact-info">
          <div class="contact-name">${c.name}</div>
          <div class="contact-last-msg">${preview}</div>
        </div>
        <div class="contact-meta">
          <span class="contact-time">${timeStr}</span>
          ${c.unread ? `<span class="unread-badge">${c.unread}</span>` : ''}
        </div>
      `);

      $item.on('click', () => openChat(c.id));
      $('#contactList').append($item);
    });
  }

  function updateUnreadTotal() {
    const total = CONTACTS.reduce((s, c) => s + (c.unread || 0), 0);
    $('#unreadTotal').text(total || '').toggle(total > 0);
  }

  // ── OPEN CHAT ──────────────────────────────────────────
  function openChat(id) {
    activeId = id;
    const c = CONTACTS.find(x => x.id === id);
    if (!c) return;

    // Clear unread
    c.unread = 0;
    updateUnreadTotal();

    // Update sidebar active state
    $('.contact-item').removeClass('active');
    $(`.contact-item[data-id="${id}"]`).addClass('active');
    // Clear unread badge on that item
    $(`.contact-item[data-id="${id}"] .unread-badge`).remove();

    // Show chat panel, hide welcome
    $('#welcomeScreen').addClass('d-none');
    $('#activeChat').removeClass('d-none');

    // Header
    $('#chatHeaderAvatar')
      .css('background', c.avatar.bg)
      .text(c.avatar.emoji);
    $('#chatHeaderName').text(c.name);
    $('#chatHeaderStatus').text(c.lastSeen);

    // Mobile: hide sidebar
    if ($(window).width() <= 768) {
      $('#sidebar').addClass('hidden');
    }

    // Render messages
    renderMessages(c);
  }

  // ── RENDER MESSAGES ────────────────────────────────────
  function renderMessages(c) {
    const $area = $('#messagesArea');
    $area.empty();
    $area.append('<div class="date-divider"><span>Today</span></div>');

    c.messages.forEach(msg => appendMessage(msg, c, false));
    scrollToBottom();
  }

  function appendMessage(msg, c, animate) {
    const $area   = $('#messagesArea');
    const isMe    = msg.from === 'me';
    const contact = c || CONTACTS.find(x => x.id === activeId);

    const avatarHtml = isMe
      ? `<div class="msg-avatar" style="background:${currentUser.avatar.bg}">${currentUser.avatar.emoji}</div>`
      : `<div class="msg-avatar" style="background:${contact.avatar.bg}">${contact.avatar.emoji}</div>`;

    const senderHtml = (!isMe && contact.isGroup && msg.sender)
      ? `<div class="msg-sender">${msg.sender}</div>`
      : '';

    const reactionsHtml = msg.reactions && msg.reactions.length
      ? `<div class="msg-reactions">${msg.reactions.map(r => `<span class="reaction-chip">${r}</span>`).join('')}</div>`
      : '';

    const tickHtml = isMe ? `<span class="read-tick">✓✓</span>` : '';

    const $row = $('<div>').addClass(`msg-row ${isMe ? 'me' : 'them'}`);
    $row.html(`
      ${!isMe ? avatarHtml : ''}
      <div class="msg-bubble-wrap">
        ${senderHtml}
        <div class="msg-bubble">${msg.text}</div>
        ${reactionsHtml}
        <div class="msg-time">${tickHtml}${msg.time}</div>
      </div>
      ${isMe ? avatarHtml : ''}
    `);

    // Double-click to react
    $row.find('.msg-bubble').on('dblclick', function () {
      const rnd = EMOJIS[Math.floor(Math.random() * 8)]; // hearts/fire/etc
      if (!msg.reactions) msg.reactions = [];
      msg.reactions.push(rnd);
      const $reacts = $row.find('.msg-reactions');
      if ($reacts.length) {
        $reacts.append(`<span class="reaction-chip">${rnd}</span>`);
      } else {
        $row.find('.msg-bubble').after(`<div class="msg-reactions"><span class="reaction-chip">${rnd}</span></div>`);
      }
      showToast(`Reacted with ${rnd}`);
    });

    $area.append($row);
    if (animate) scrollToBottom();
  }

  function scrollToBottom() {
    const $area = $('#messagesArea');
    $area.scrollTop($area[0].scrollHeight);
  }

  // ── SEND MESSAGE ───────────────────────────────────────
  function sendMessage() {
    const text = $('#messageInput').val().trim();
    if (!text || activeId === null) return;

    const c = CONTACTS.find(x => x.id === activeId);
    if (!c) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const msg = { from: 'me', text, time: timeStr, date: 'Today', reactions: [] };
    c.messages.push(msg);

    appendMessage(msg, c, true);
    $('#messageInput').val('').css('height', 'auto');
    $('#emojiPicker').addClass('d-none');

    // Update sidebar preview
    $(`.contact-item[data-id="${activeId}"] .contact-last-msg`).text(text.substring(0, 36));
    $(`.contact-item[data-id="${activeId}"] .contact-time`).text(timeStr);

    // Auto-reply after delay (not for self-chat)
    if (!c.isSelf) {
      setTimeout(() => triggerAutoReply(c), 1200 + Math.random() * 1800);
    }
  }

  function triggerAutoReply(c) {
    if (activeId !== c.id) return;
    const replies = AUTO_REPLIES[c.id] || [];
    if (!replies.length) return;

    // Show typing
    $('#typingName').text(c.name.split(' ')[0]);
    $('#typingIndicator').removeClass('d-none');
    scrollToBottom();

    setTimeout(() => {
      $('#typingIndicator').addClass('d-none');
      const reply = replies[Math.floor(Math.random() * replies.length)];
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const msg = { from: 'them', text: reply, time: timeStr, date: 'Today', reactions: [] };
      c.messages.push(msg);
      appendMessage(msg, c, true);
      $(`.contact-item[data-id="${c.id}"] .contact-last-msg`).text(reply.substring(0, 36));
      $(`.contact-item[data-id="${c.id}"] .contact-time`).text(timeStr);
    }, 900 + Math.random() * 600);
  }

  // ── EVENT: Send button ──────────────────────────────────
  $('#sendBtn').on('click', sendMessage);

  $('#messageInput').on('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Auto-resize textarea
  $('#messageInput').on('input', function () {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 120) + 'px';
  });

  // ── EMOJI PICKER ───────────────────────────────────────
  EMOJIS.forEach(em => {
    const $btn = $('<div>').addClass('emoji-btn-item').text(em);
    $btn.on('click', () => {
      const $inp = $('#messageInput');
      $inp.val($inp.val() + em).trigger('focus');
      $('#emojiPicker').addClass('d-none');
    });
    $('#emojiGrid').append($btn);
  });

  $('#emojiToggle').on('click', (e) => {
    e.stopPropagation();
    $('#emojiPicker').toggleClass('d-none');
  });

  $(document).on('click', (e) => {
    if (!$(e.target).closest('#emojiPicker, #emojiToggle').length) {
      $('#emojiPicker').addClass('d-none');
    }
  });

  // ── SEARCH CONTACTS ────────────────────────────────────
  $('#contactSearch').on('input', function () {
    const q = $(this).val().toLowerCase();
    const filtered = q ? CONTACTS.filter(c => c.name.toLowerCase().includes(q)) : CONTACTS;
    renderContacts(filtered);
  });

  // ── TABS ───────────────────────────────────────────────
  $('.tab-btn').on('click', function () {
    $('.tab-btn').removeClass('active');
    $(this).addClass('active');
    const tab = $(this).data('tab');
    if (tab === 'groups') {
      renderContacts(CONTACTS.filter(c => c.isGroup));
    } else if (tab === 'online') {
      renderContacts(CONTACTS.filter(c => c.status === 'online'));
    } else {
      renderContacts(CONTACTS);
    }
  });

  // ── BACK BUTTON (mobile) ───────────────────────────────
  $('#backBtn').on('click', () => {
    $('#sidebar').removeClass('hidden');
  });

  // ── MORE OPTIONS → show right panel ───────────────────
  $('#moreOptionsBtn').on('click', () => {
    if (!activeId) return;
    const c = CONTACTS.find(x => x.id === activeId);
    buildRightPanel(c);
    $('#rightPanel').toggleClass('d-none');
  });

  $('#closeRightPanel').on('click', () => $('#rightPanel').addClass('d-none'));

  function buildRightPanel(c) {
    const statusLabel = { online: '🟢 Online', away: '🟡 Away', offline: '⚫ Offline', group: '👥 Group' }[c.status] || '';
    $('#rightPanelBody').html(`
      <div class="profile-big-avatar" style="background:${c.avatar.bg}">${c.avatar.emoji}</div>
      <div class="profile-name">${c.name}</div>
      <div class="profile-about">${c.about}</div>
      <div class="text-center mb-3" style="font-size:0.8rem;color:var(--text-dim)">${statusLabel}</div>
      <div class="profile-actions">
        <div class="profile-action-btn">
          <button class="icon-btn-sm" onclick=""><i class="fas fa-phone"></i></button>
          <span>Call</span>
        </div>
        <div class="profile-action-btn">
          <button class="icon-btn-sm" onclick=""><i class="fas fa-video"></i></button>
          <span>Video</span>
        </div>
        <div class="profile-action-btn">
          <button class="icon-btn-sm"><i class="fas fa-search"></i></button>
          <span>Search</span>
        </div>
        <div class="profile-action-btn">
          <button class="icon-btn-sm"><i class="fas fa-bell-slash"></i></button>
          <span>Mute</span>
        </div>
      </div>
      <hr style="border-color:var(--border);margin:16px 0">
      <div style="font-size:0.8rem;color:var(--text-dim)">
        <p class="mb-2"><i class="fas fa-comment-dots me-2"></i>${c.messages.length} messages</p>
        <p class="mb-2"><i class="fas fa-image me-2"></i>No media shared</p>
      </div>
    `);
  }

  // ── CALL MODAL ─────────────────────────────────────────
  $('#voiceCallBtn, #videoCallBtn').on('click', function () {
    if (!activeId) return;
    const c = CONTACTS.find(x => x.id === activeId);
    const isVideo = $(this).attr('id') === 'videoCallBtn';
    startCall(c, isVideo);
  });

  function startCall(c, isVideo) {
    $('#callAvatar').css('background', c.avatar.bg).text(c.avatar.emoji);
    $('#callName').text(c.name);
    $('#callStatus').text(isVideo ? '📹 Video Calling...' : '📞 Calling...');
    $('#callTimer').addClass('d-none').text('00:00');
    $('#callModal').removeClass('d-none');

    // Simulate pickup after 2.5s
    setTimeout(() => {
      if ($('#callModal').hasClass('d-none')) return;
      $('#callStatus').text(isVideo ? '📹 Video call in progress' : '📞 Call connected');
      $('#callTimer').removeClass('d-none');
      callSeconds = 0;
      callInterval = setInterval(() => {
        callSeconds++;
        const m = String(Math.floor(callSeconds / 60)).padStart(2, '0');
        const s = String(callSeconds % 60).padStart(2, '0');
        $('#callTimer').text(`${m}:${s}`);
      }, 1000);
    }, 2500);
  }

  $('#endCallBtn').on('click', endCall);
  function endCall() {
    clearInterval(callInterval);
    callSeconds = 0;
    $('#callModal').addClass('d-none');
    if (activeId) {
      const c = CONTACTS.find(x => x.id === activeId);
      showToast(`📞 Call ended with ${c ? c.name.split(' ')[0] : 'contact'}`);
    }
  }

  $('#muteBtn').on('click', function () {
    const $i = $(this).find('i');
    $i.toggleClass('fa-microphone fa-microphone-slash');
    $(this).toggleClass('active');
  });

  // ── WELCOME → NEW CHAT ─────────────────────────────────
  $('#welcomeNewChat, #newChatBtn').on('click', () => {
    openChat(CONTACTS[0].id);
  });

  // ── LOGOUT ─────────────────────────────────────────────
  $('#logoutBtn').on('click', () => {
    if (confirm('Sign out of ChatWave?')) {
      activeId = null;
      $('#chatApp').fadeOut(300, () => {
        $('#loginScreen').fadeIn(400);
        $('#loginName').val('');
        $('#activeChat').addClass('d-none');
        $('#welcomeScreen').removeClass('d-none');
      });
    }
  });

  // ── SETTINGS BTN ───────────────────────────────────────
  $('#settingsBtn').on('click', () => showToast('⚙️ Settings coming soon!'));

  // ── TOAST ──────────────────────────────────────────────
  function showToast(msg) {
    $('#toastBody').text(msg);
    const toastEl = document.getElementById('appToast');
    const toast = bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 2500 });
    toast.show();
  }

  // ── KEYBOARD SHORTCUT: Escape closes emoji ─────────────
  $(document).on('keydown', e => {
    if (e.key === 'Escape') $('#emojiPicker').addClass('d-none');
  });

});
