import { Article } from './article.model';

export interface DjangoResponse {
    count: number;
    next: string;
    previous: string;
    results: Article[];
}