const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const {spawn}=require('node:child_process');
const root=path.resolve(__dirname,'dist');
const openBrowser=process.argv.includes('--open');
if(!fs.existsSync(path.join(root,'index.html'))){console.error('Extract the entire ZIP before running Start-Preview.cmd. The dist folder must be beside this launcher.');process.exit(1);}
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.webp':'image/webp','.avif':'image/avif','.jpg':'image/jpeg','.png':'image/png','.woff2':'font/woff2','.mp4':'video/mp4','.glb':'model/gltf-binary'};
const server=http.createServer((req,res)=>{
  const url=new URL(req.url,'http://localhost');
  const file=path.resolve(root,'.'+decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname));
  if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
  fs.stat(file,(err,stat)=>{
    if(err||!stat.isFile()){res.writeHead(404).end('Not found');return;}
    const headers={'Content-Type':types[path.extname(file)]||'application/octet-stream','Accept-Ranges':'bytes'};
    const range=/bytes=(\d+)-(\d*)/.exec(req.headers.range||'');
    let start=0,end=stat.size-1;
    if(range){start=Number(range[1]);if(range[2])end=Math.min(Number(range[2]),end);headers['Content-Range']=`bytes ${start}-${end}/${stat.size}`;}
    headers['Content-Length']=end-start+1;
    res.writeHead(range?206:200,headers);
    if(req.method==='HEAD')res.end();else fs.createReadStream(file,{start,end}).pipe(res);
  });
});
server.on('error',e=>{console.error(e);process.exit(1)});
server.listen(0,'127.0.0.1',()=>{
  const address=`http://127.0.0.1:${server.address().port}/`;
  console.log(`Local: ${address}`);
  console.log('Keep this window open while viewing the website. Press Ctrl+C to stop.');
  if(openBrowser){
    const child=spawn('cmd.exe',['/d','/c','start','',address],{windowsHide:true,stdio:'ignore'});
    child.on('error',()=>console.log(`Open ${address} in your browser.`));
    child.unref();
  }
});

