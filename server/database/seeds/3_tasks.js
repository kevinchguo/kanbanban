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
          position: 1
        },
        {
          list_id: 3,
          description:
            "sed lacus morbi sem mauris laoreet ut rhoncus aliquet pulvinar sed nisl nunc rhoncus dui",
          position: 1
        },
        {
          list_id: 3,
          description:
            "risus dapibus augue vel accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet",
          position: 2
        },
        {
          list_id: 3,
          description:
            "mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis mattis egestas metus aenean",
          position: 3
        },
        {
          list_id: 1,
          description:
            "quam suspendisse potenti nullam porttitor lacus at turpis donec posuere metus",
          position: 2
        },
        {
          list_id: 3,
          description:
            "dapibus augue vel accumsan tellus nisi eu orci mauris lacinia",
          position: 4
        },
        {
          list_id: 3,
          description:
            "odio consequat varius integer ac leo pellentesque ultrices mattis odio donec",
          position: 5
        },
        {
          list_id: 3,
          description:
            "vulputate justo in blandit ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing",
          position: 6
        },
        {
          list_id: 2,
          description:
            "erat curabitur gravida nisi at nibh in hac habitasse platea dictumst aliquam",
          position: 1
        },
        {
          list_id: 2,
          description:
            "sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh in quis justo maecenas rhoncus aliquam lacus",
          position: 2
        }
      ]);
    });
};
