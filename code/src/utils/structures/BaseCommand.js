module.exports = class BaseCommand {
  constructor(name, category, aliases) {
    this.name = name.toLowerCase();
    this.category = category;
    this.aliases = aliases;
  }
}