const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rolekle')
    .setDescription('Bir kullanıcıya rol ekler.')
    .addRoleOption((option) => option.setName('rol').setDescription('Rolü seçiniz.').setRequired(true))
    .addUserOption((option) => option.setName('kullanıcı').setDescription('Kullanıcıyı seçiniz.').setRequired(true)),

  // eslint-disable-next-line consistent-return
  async execute(interaction) {
    try {
      const userroles = interaction.member.roles.cache.map((role) => role.id)
      const roles = ['1072134487745511526']

      if (!userroles.some((role) => roles.includes(role))) {
        return interaction.reply('Bu komutu kullanmak için yetkiniz yok.')
      }
      const role = interaction.options.getRole('rol')
      const user = interaction.options.getUser('kullanıcı')

      await interaction.guild.members.cache.get(user.id).roles.add(role)
      await interaction.reply(`${user.username} kullanıcısına ${role.name} rolü verildi.`)
    } catch (error) {
      console.error(error)
      console.log(error.rawError)
      console.log(error.rawError.message)
      await interaction.reply(
        `Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz. Hata kodu: ${error.rawError.message}`,
      )
    }
  },
}
