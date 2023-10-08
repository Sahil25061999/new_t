export type urls = {
  full:string;
  raw:string;
  regular:string;
  small:string;
  small_s3:string;
  thumb:string;
}
export interface product{
  id?: string;
  description?:string;
  alt_description?:string;
  urls?:urls;
}