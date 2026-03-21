export interface GithubUser  {
    username : string ,
    name : string,
    avatar : string,
    bio : string | null,
    followers : number,
    following : number,
    publicRepos : number,
}