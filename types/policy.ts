export interface Rider{
    id:number,
    name:string,
    category:["check up","super reduction","reduction","semi reduction"],
    description:string
}
export interface CoverOption{
    cover_amount:number,
    one_year:number,
    two_year:number,
    three_year:number
}
export interface Policy{
  id:number,
  name:string,
  image_url:string,
  description:string,
  policy_document_url:string,
  policy_brochure_url:string,
  insurance_provider_id:number,
  cover_options:CoverOption[],
  riders:Rider[]
}
