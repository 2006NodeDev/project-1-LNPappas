export let BaseUrl:string

if(process.env['NODE_ENV'] === 'production'){
    BaseUrl = 'http://project1-service.lnpappas.com'
} else{
    BaseUrl = 'http://localhost:2006'
}