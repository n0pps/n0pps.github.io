---
layout: default
title: Home
description: "Blog"
---
<pre>
<b>Malware Sample Lookup</b>
Enter a malware name to fetch sample hashes:
<br>
<input type="text" id="malware-input" placeholder="e.g., Trojan.Nanocore" />
<br>
<button onclick="fetchMalwareData()">Search</button>

<div id="av-list">
    <!-- Search results will be displayed here -->
</div>
</pre>
<script src="assets/js/api.js"></script>
