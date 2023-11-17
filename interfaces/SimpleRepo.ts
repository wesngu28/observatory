export default interface SimpleRepo {
    name: string;
    author: string;
    description: string;
    url: string;
    authorUrl: string;
    stargazers: number;
    starred?: boolean;
}