/* ===== 在线工具集 - 通用脚本 ===== */
(function () {
  'use strict';

  // 工具清单（导航与首页共用）
  var TOOLS = [
    { id: 'qr-code', name: '二维码生成器', icon: '🔳', cat: '图片', tag: '热门', desc: '生成自定义样式二维码，支持 Logo 与颜色' },
    { id: 'image-compress', name: '图片压缩', icon: '🖼️', cat: '图片', tag: '热门', desc: '在线压缩 JPG/PNG， adjustable 质量与尺寸' },
    { id: 'password', name: '密码生成器', icon: '🔑', cat: '文本', desc: '生成强随机密码，可定制长度与字符集' },
    { id: 'base64', name: 'Base64 编解码', icon: '🔁', cat: '编码', desc: '文本与 Base64 互转，支持中文与文件' },
    { id: 'json-formatter', name: 'JSON 格式化', icon: '📄', cat: '开发', tag: '热门', desc: '格式化、压缩、校验 JSON，错误高亮' },
    { id: 'word-counter', name: '字数统计', icon: '🔢', cat: '文本', desc: '统计字符、单词、行数与阅读时间' },
    { id: 'color-picker', name: '颜色工具', icon: '🎨', cat: '设计', desc: '取色、HEX/RGB/HSL 互转、调色板生成' },
    { id: 'timestamp', name: '时间戳转换', icon: '⏰', cat: '开发', desc: 'Unix 时间戳与日期互转，多时区' },
    { id: 'uuid', name: 'UUID 生成器', icon: '🆔', cat: '开发', desc: '批量生成 UUID v4，一键复制' },
    { id: 'regex-tester', name: '正则测试', icon: '🔣', cat: '开发', desc: '实时正则匹配测试，分组高亮' }
  ];

  var CAT_ICON = { '图片': '🖼️', '文本': '📝', '编码': '🔁', '开发': '⚙️', '设计': '🎨' };

  // 注入顶部导航
  function injectHeader() {
    var path = location.pathname;
    var depth = path.includes('/tools/') ? '../' : '';
    var hdr = document.createElement('header');
    hdr.className = 'site-header';
    hdr.innerHTML =
      '<nav class="nav">' +
        '<a class="brand" href="' + depth + 'index.html"><span class="logo">工</span><span>妙用工具</span></a>' +
        '<div class="nav-links">' +
          '<a href="' + depth + 'index.html">全部工具</a>' +
          '<a href="' + depth + 'index.html#about">关于</a>' +
          '<input class="nav-search" id="navSearch" placeholder="搜索工具…" autocomplete="off">' +
        '</div>' +
      '</nav>';
    document.body.insertBefore(hdr, document.body.firstChild);

    var ns = document.getElementById('navSearch');
    if (ns) {
      ns.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { location.href = depth + 'index.html?q=' + encodeURIComponent(ns.value); }
      });
    }
  }

  // 注入页脚
  function injectFooter() {
    var path = location.pathname;
    var depth = path.includes('/tools/') ? '../' : '';
    var f = document.createElement('footer');
    f.className = 'site-footer';
    f.innerHTML =
      '<div class="footer-grid">' +
        '<div><h4>妙用工具</h4><p class="fbrand">免费在线工具集合，所有处理均在浏览器本地完成，数据不上传服务器，安全可靠。持续更新中。</p></div>' +
        '<div><h4>热门工具</h4>' +
          '<a href="' + depth + 'tools/qr-code.html">二维码生成器</a>' +
          '<a href="' + depth + 'tools/image-compress.html">图片压缩</a>' +
          '<a href="' + depth + 'tools/json-formatter.html">JSON 格式化</a>' +
          '<a href="' + depth + 'tools/password.html">密码生成器</a>' +
        '</div>' +
        '<div><h4>开发工具</h4>' +
          '<a href="' + depth + 'tools/base64.html">Base64 编解码</a>' +
          '<a href="' + depth + 'tools/timestamp.html">时间戳转换</a>' +
          '<a href="' + depth + 'tools/uuid.html">UUID 生成器</a>' +
          '<a href="' + depth + 'tools/regex-tester.html">正则测试</a>' +
        '</div>' +
        '<div><h4>更多</h4>' +
          '<a href="' + depth + 'index.html#about">关于我们</a>' +
          '<a href="' + depth + 'index.html#contact">联系方式</a>' +
          '<a href="' + depth + 'index.html#privacy">隐私政策</a>' +
        '</div>' +
      '</div>' +
      '<div class="footer-bottom">© ' + new Date().getFullYear() + ' 妙用工具 · 所有工具免费使用 · 数据本地处理</div>';
    document.body.appendChild(f);
  }

  // 渲染首页工具网格（带搜索/分类）
  function renderIndexGrid() {
    var host = document.getElementById('toolGridHost');
    if (!host) return;

    var params = new URLSearchParams(location.search);
    var q = (params.get('q') || '').toLowerCase().trim();
    var searchBox = document.getElementById('heroSearchInput');
    if (searchBox && q) searchBox.value = q;

    var cats = {};
    TOOLS.forEach(function (t) {
      if (q && t.name.toLowerCase().indexOf(q) < 0 && t.desc.toLowerCase().indexOf(q) < 0 && t.cat.toLowerCase().indexOf(q) < 0) return;
      (cats[t.cat] = cats[t.cat] || []).push(t);
    });

    var html = '';
    var order = ['图片', '开发', '文本', '编码', '设计'];
    order.forEach(function (cat) {
      if (!cats[cat]) return;
      html += '<div class="cat-block">' +
        '<h2 class="section-title"><span class="ic">' + (CAT_ICON[cat] || '·') + '</span>' + cat + '工具</h2>' +
        '<p class="section-desc">' + cats[cat].length + ' 个工具</p>' +
        '<div class="tool-grid">';
      cats[cat].forEach(function (t) {
        html += toolCard(t);
      });
      html += '</div></div>';
    });
    if (!html) html = '<p class="muted" style="text-align:center;padding:40px">没有找到匹配的工具，换个关键词试试？</p>';
    host.innerHTML = html;
  }

  function toolCard(t) {
    var tag = t.tag ? '<span class="tc-tag ' + (t.tag === '热门' ? 'hot' : '') + '">' + t.tag + '</span>' : '';
    return '<a class="tool-card" href="tools/' + t.id + '.html">' +
      tag +
      '<div class="tc-icon">' + t.icon + '</div>' +
      '<h3>' + t.name + '</h3>' +
      '<p>' + t.desc + '</p>' +
      '</a>';
  }

  // 复制到剪贴板
  window.copyText = function (text, btn) {
    function done() {
      if (btn) { var o = btn.textContent; btn.textContent = '✓ 已复制'; setTimeout(function () { btn.textContent = o; }, 1300); }
      toast('已复制到剪贴板');
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text); done(); });
    } else { fallbackCopy(text); done(); }
  };
  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
  }

  var toastEl;
  window.toast = function (msg) {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'toast'; document.body.appendChild(toastEl); }
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(function () { toastEl.classList.remove('show'); }, 1800);
  };

  // 下载文本为文件
  window.downloadText = function (filename, text) {
    var blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  };

  // 下载 blob
  window.downloadBlob = function (filename, blob) {
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  };

  // 读取文件为文本
  window.readFileText = function (file, cb) {
    var r = new FileReader();
    r.onload = function () { cb(r.result); };
    r.readAsText(file, 'utf-8');
  };

  document.addEventListener('DOMContentLoaded', function () {
    injectHeader();
    renderIndexGrid();
    injectFooter();
  });

  // 暴露工具列表供首页搜索框使用
  window.TOOLS = TOOLS;
})();
