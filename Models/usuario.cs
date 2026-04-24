using System.ComponentModel.DataAnnotations;
using TicketFlow.API.Enums;

namespace TicketFlow.API.Models
{
    public class Usuario
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Nome { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [MaxLength(150)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MinLength(6)]
        public string Senha { get; set; } = string.Empty;

        [Required]
        public PerfilUsuario Perfil { get; set; }

        public DateTime DataCriacao { get; set; } = DateTime.Now;

        public ICollection<Chamado> ChamadosAbertos { get; set; } = new List<Chamado>();

        public ICollection<Chamado> ChamadosComoTecnico { get; set; } = new List<Chamado>();
    }
}