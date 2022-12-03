import { CategoryPortfolioInterface } from "./category-portfolio.interface";

export interface PortfolioInterface {
  id: number,
  title: string,
  metaDescription: string,
  photoURL: string,
  categoryPortfolio: CategoryPortfolioInterface,
  content: string
}