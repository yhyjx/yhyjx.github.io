import{_ as s,c as n,o as a,U as o}from"./chunks/framework.900b830a.js";const d=JSON.parse('{"title":"github","description":"","frontmatter":{},"headers":[],"relativePath":"我的笔记/常用工具/github.md","lastUpdated":null}'),l={name:"我的笔记/常用工具/github.md"},p=o(`<h1 id="github" tabindex="-1">github <a class="header-anchor" href="#github" aria-label="Permalink to &quot;github&quot;">​</a></h1><h2 id="国内访问慢" tabindex="-1">国内访问慢 <a class="header-anchor" href="#国内访问慢" aria-label="Permalink to &quot;国内访问慢&quot;">​</a></h2><p>mac 解决方式，</p><ul><li>编写如下 <code>githubHosts</code> 放置到 <code>/usr/local/bin</code>环境变量中</li><li>通过<code>sudo chmod +x hostgithub </code>赋予系统权限</li><li>之后通过执行 <code>githubHosts -u</code> 进行更新 hosts ，hosts 地址采用<code>https://raw.hellogithub.com/hosts</code>可自行修改。</li><li>修改后如果未生效执行 <code>sudo dscacheutil -flushcache</code> 刷新 dns 缓存。</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">#!/bin/bash</span></span>
<span class="line"><span style="color:#A6ACCD;">showHelp() {</span></span>
<span class="line"><span style="color:#A6ACCD;">    echo &quot;-u [source_url]   update github hosts. You can specify a custom host source&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    echo &quot;-b    backup /etc/hosts to /etc/hosts.backup&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    echo &quot;-r    recover hosts.backup to hosts&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    echo &quot;-f    list files in /etc which contains \\&quot;hosts\\&quot;&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># ====== Main =====</span></span>
<span class="line"><span style="color:#A6ACCD;">if [ $# -eq 0 ]; then showHelp;exit 0;fi</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"># CONF</span></span>
<span class="line"><span style="color:#A6ACCD;">download_dir=&quot;$HOME/etc/hoststool&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">github_hosts=&quot;https://raw.hellogithub.com/hosts&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">if [ ! -d &quot;$download_dir&quot; ]; then</span></span>
<span class="line"><span style="color:#A6ACCD;">  mkdir -p $download_dir</span></span>
<span class="line"><span style="color:#A6ACCD;">fi</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">case &quot;$1&quot; in</span></span>
<span class="line"><span style="color:#A6ACCD;">    -f)</span></span>
<span class="line"><span style="color:#A6ACCD;">        ls /etc | grep hosts;</span></span>
<span class="line"><span style="color:#A6ACCD;">        exit 0;;</span></span>
<span class="line"><span style="color:#A6ACCD;">    -b)</span></span>
<span class="line"><span style="color:#A6ACCD;">        sudo cp /etc/hosts /etc/hosts.backup;</span></span>
<span class="line"><span style="color:#A6ACCD;">        exit 0;;</span></span>
<span class="line"><span style="color:#A6ACCD;">    -r)</span></span>
<span class="line"><span style="color:#A6ACCD;">        sudo cp /etc/hosts.backup /etc/hosts;</span></span>
<span class="line"><span style="color:#A6ACCD;">        exit 0;;</span></span>
<span class="line"><span style="color:#A6ACCD;">    -u)</span></span>
<span class="line"><span style="color:#A6ACCD;">        if [ $2 ]; then github_hosts=$2;fi</span></span>
<span class="line"><span style="color:#A6ACCD;">        curl -o \${download_dir}/hosts \${github_hosts};</span></span>
<span class="line"><span style="color:#A6ACCD;">        if [ $? -ne 0 ]; then</span></span>
<span class="line"><span style="color:#A6ACCD;">            echo &quot;[ERROR] 获取远程 host 出错，请尝试更换 source 或检查 download_dir 读写权限&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">            osascript -e &#39;display notification &quot;获取远程 host 出错，请尝试更换 source&quot; with title &quot;hoststool&quot;&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">            exit 1</span></span>
<span class="line"><span style="color:#A6ACCD;">        fi</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        # Validate host content length</span></span>
<span class="line"><span style="color:#A6ACCD;">        lines=$(awk &#39;{print NR}&#39; \${download_dir}/hosts | tail -n1)</span></span>
<span class="line"><span style="color:#A6ACCD;">        if [ $lines -lt 10 ]</span></span>
<span class="line"><span style="color:#A6ACCD;">        then</span></span>
<span class="line"><span style="color:#A6ACCD;">            echo &#39;[ERRO] 远程 Github Hosts 无效（Gitee源不稳定），通常重试即可&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">            osascript -e &#39;display notification &quot;远程 Github Hosts 无效（Gitee源不稳定），通常重试即可&quot; with title &quot;hoststool&quot;&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">            rm \${download_dir}/hosts</span></span>
<span class="line"><span style="color:#A6ACCD;">            exit 1</span></span>
<span class="line"><span style="color:#A6ACCD;">        fi</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        # Remove old content</span></span>
<span class="line"><span style="color:#A6ACCD;">        begin=$(sed -n  &#39;/# ==== Github Start ====/=&#39; /etc/hosts | awk &#39;NR==1{print}&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">        end=$(sed -n  &#39;/# ==== Github End ====/=&#39; /etc/hosts | awk &#39;END{print}&#39;)</span></span>
<span class="line"><span style="color:#A6ACCD;">        echo &quot;Removing old hosts. Start at line \\&quot;\${begin}\\&quot;, End at line \\&quot;\${end}\\&quot;&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">        cat /etc/hosts | sed &quot;\${begin},\${end}d&quot; &gt; \${download_dir}/hosts.tmp</span></span>
<span class="line"><span style="color:#A6ACCD;">        if [ $? -ne 0 ]; then</span></span>
<span class="line"><span style="color:#A6ACCD;">            ## Trip Failed</span></span>
<span class="line"><span style="color:#A6ACCD;">            echo &quot;[INFO] 当前 Host中 无旧的 Github Host 标记可清除&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">        else</span></span>
<span class="line"><span style="color:#A6ACCD;">            ## Trip Succeed, move result</span></span>
<span class="line"><span style="color:#A6ACCD;">            echo &quot;[INFO] 清除旧的 Github Host 标记&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">            sudo cp /etc/hosts /etc/hosts.backup &amp;&amp; sudo cp \${download_dir}/hosts.tmp /etc/hosts;</span></span>
<span class="line"><span style="color:#A6ACCD;">        fi</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        # Add new hosts</span></span>
<span class="line"><span style="color:#A6ACCD;">        sudo bash -c &quot;echo &#39;# ==== Github Start ====&#39; &gt;&gt; /etc/hosts&quot; # Add github host</span></span>
<span class="line"><span style="color:#A6ACCD;">        if [ $? -ne 0 ]; then</span></span>
<span class="line"><span style="color:#A6ACCD;">            echo &quot;[ERROR] 无root权限，请尝试运行脚本手动输入密码&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">            osascript -e &#39;display notification &quot;无root权限，请尝试运行脚本手动输入密码&quot; with title &quot;hoststool&quot;&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">            rm \${download_dir}/hosts.tmp</span></span>
<span class="line"><span style="color:#A6ACCD;">            rm \${download_dir}/hosts</span></span>
<span class="line"><span style="color:#A6ACCD;">            exit 1;</span></span>
<span class="line"><span style="color:#A6ACCD;">        fi</span></span>
<span class="line"><span style="color:#A6ACCD;">        sudo bash -c &quot;echo \\&quot;# Updated at $(date)\\&quot; &gt;&gt; /etc/hosts&quot; # Add github host</span></span>
<span class="line"><span style="color:#A6ACCD;">        sudo bash -c &quot;cat \${download_dir}/hosts &gt;&gt; /etc/hosts&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">        sudo bash -c &quot;echo &#39;# ==== Github End ====&#39; &gt;&gt; /etc/hosts&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">        rm \${download_dir}/hosts.tmp</span></span>
<span class="line"><span style="color:#A6ACCD;">        rm \${download_dir}/hosts</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">        echo &quot;[INFO] Github Hosts 块更新于 $(date)&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">        osascript -e &#39;display notification &quot;Github Hosts 已更新&quot; with title &quot;hoststool&quot;&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">        exit 0;;</span></span>
<span class="line"><span style="color:#A6ACCD;">    -h|--help)</span></span>
<span class="line"><span style="color:#A6ACCD;">        showHelp;</span></span>
<span class="line"><span style="color:#A6ACCD;">        exit 0;;</span></span>
<span class="line"><span style="color:#A6ACCD;">    *)</span></span>
<span class="line"><span style="color:#A6ACCD;">        echo &quot;Unknown command&quot;;</span></span>
<span class="line"><span style="color:#A6ACCD;">        showHelp;</span></span>
<span class="line"><span style="color:#A6ACCD;">        exit 1;;</span></span>
<span class="line"><span style="color:#A6ACCD;">esac</span></span></code></pre></div>`,5),t=[p];function e(c,i,A,C,r,h){return a(),n("div",null,t)}const y=s(l,[["render",e]]);export{d as __pageData,y as default};
