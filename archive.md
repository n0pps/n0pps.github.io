---
layout: default
title: "Archive"
description: "Blog"
status: live
---

<pre>
 █████  ██████   ██████ ██   ██ ██ ██    ██ ███████ 
██   ██ ██   ██ ██      ██   ██ ██ ██    ██ ██      
███████ ██████  ██      ███████ ██ ██    ██ █████   
██   ██ ██   ██ ██      ██   ██ ██  ██  ██  ██      
██   ██ ██   ██  ██████ ██   ██ ██   ████   ███████ 
                                                    
<table class="post-table">
    <thead>
        <tr>
            <th>Post </th>
            <th> #Title</th>
            <th> Date</th>
        </tr>
    </thead>
    <tbody>
        {% for post in site.posts %}
        <tr>
            <td>{{ forloop.index }}</td>
            <td> <a href="{{ post.url | relative_url }}">{{ post.title }}</a></td>
            <td> {{ post.date | date: "%B %d, %Y" }}</td>
        </tr>
        {% endfor %}
    </tbody>
</table>

 

</pre>