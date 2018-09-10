exports.seed = knex =>
  knex("config")
    .del()
    .then(() => {
      return knex("config").insert([
        { name: "novaposhta_key", value: "" },
        { name: "bsg_token", value: "" },
        { name: "alpha_name", value: "" },
        { name: "orders_check_interval", value: "*/30 * * * *" }
      ]);
    });
