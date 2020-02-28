exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("tasks")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("tasks").insert([
        {
          list_id: 1,
          description:
            "aliquet massa id lobortis convallis tortor risus dapibus augue vel accumsan tellus nisi eu orci",
          position: 1000
        },
        {
          list_id: 3,
          description:
            "Position 3 sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui",
          position: 3000
        },
        {
          list_id: 3,
          description:
            "Position 2risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet",
          position: 2000
        },
        {
          list_id: 3,
          description:
            "Position 1 mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean",
          position: 1000
        },
        {
          list_id: 1,
          description:
            "quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus",
          position: 2000
        },
        {
          list_id: 3,
          description:
            "dapibus augue vel accumsan tellus nisi eu orci mauris lacinia",
          position: 4000
        },
        {
          list_id: 3,
          description:
            "odio consequat varius integer ac leo pellentesque ultrices mattis odio donec",
          position: 5000
        },
        {
          list_id: 3,
          description:
            "vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing",
          position: 6000
        },
        {
          list_id: 2,
          description:
            "erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam",
          position: 1000
        },
        {
          list_id: 2,
          description:
            "sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus",
          position: 2000
        }
      ]);
    });
};
