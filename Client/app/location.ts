export class Location {
  _id: string;
  id: string;
  name: string;
  center: [number];
  spaces: Space[];
}


export class Space {
			id: string;
			_id: string;
  			name: string;
			loc: [number];
			rate: number;
			owner: {
				id: string,
				name: string
			};
			rating: {};
			slots : [{
			id : string,
			name : string,
			status : string
		}];
		cords : [{
			lat : number,
			lng : number
			}];
		}
		