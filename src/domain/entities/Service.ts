
/**
 * Service entity representing a business service offered by the company
 */
export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  details: string[];
  icon: React.ElementType;
}
