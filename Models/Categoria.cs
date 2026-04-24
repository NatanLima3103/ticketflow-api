using System.ComponentModel.DataAnnotations;

namespace TicketFlow.API.Models
{
    public class Categoria
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(80)]
        public string Nome { get; set; } = string.Empty;

        [MaxLength(250)]
        public string? Descricao { get; set; }

        public ICollection<Chamado> Chamados { get; set; } = new List<Chamado>();
    }
}