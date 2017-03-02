export class InMemoryDataService {
  createDb() {
    let locations = [{
		"id" : "JMRoad",
		"name" : "J.M. Road",
		"center" : [18.521456268852553, 73.84720355272293],
		"spaces":[{
				"id" : "JMRoad-space-8271",
				"name" : "Space-8271",
				"cords" : [{
						"lat" : 18.516811965499947,
						"lng" : 73.84288752149587
					}, {
						"lat" : 18.516801965515235,
						"lng" : 73.8429075214957
					}, {
						"lat" : 18.516521965944,
						"lng" : 73.84272752149582
					}, {
						"lat" : 18.516541965913394,
						"lng" : 73.8426975214959
					}
				],
				"slots" : [{
						"id" : "P-JMRoadJMRoad-space-82710",
						"name" : "parking-0",
						"status" : "available"
					}, {
						"id" : "P-JMRoadJMRoad-space-82711",
						"name" : "parking-1",
						"status" : "available"
					}
				],
				"loc" : [18.516811965499947, 73.84288752149587]
			}]
	}, {
		"id" : "FC Road",
		"name" : "F. C. Road",
		"center" : [18.521456268852553, 73.84720355272293],
		"spaces":[{
				"id" : "JMRoad-space-8271",
				"name" : "Space-8271",
				"cords" : [{
						"lat" : 18.516811965499947,
						"lng" : 73.84288752149587
					}, {
						"lat" : 18.516801965515235,
						"lng" : 73.8429075214957
					}, {
						"lat" : 18.516521965944,
						"lng" : 73.84272752149582
					}, {
						"lat" : 18.516541965913394,
						"lng" : 73.8426975214959
					}
				],
				"slots" : [{
						"id" : "P-JMRoadJMRoad-space-82710",
						"name" : "parking-0",
						"status" : "available"
					}, {
						"id" : "P-JMRoadJMRoad-space-82711",
						"name" : "parking-1",
						"status" : "available"
					}
				],
				"loc" : [18.516811965499947, 73.84288752149587]
			}]
	}
];
    return {locations};
  }
}

