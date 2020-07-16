export let BaseUrl:string

if(process.env['NODE_ENV'] === 'production'){
    BaseUrl = 'http://'
} else{
    BaseUrl = 'http://localhost:2006'
}