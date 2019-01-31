export class Shelter {
  constructor(
    public name: string,
    public contact: string,
    public address: string,
    public city: string,
    public state: string,
    public lngLat: string,
    public zipcode: string,
    public propertyType: string,
    public infantFriendly: string,
    public elderFriendly: string,
    public official: boolean,
    public lastUpdated: Date,
    public family: string,
    public familyAgeMin: number,
    public familyAgeMax: number,
    public _id: string
  ) { }
}