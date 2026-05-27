using System.ComponentModel.DataAnnotations;

namespace TicketFlow.API.Models
{
    public class Categoria
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(80, ErrorMessage = "Tamanho máximo 80 caracteres")]
        public string Nome { get; set; } = string.Empty;

        [MaxLength(250, ErrorMessage = "Tamanho máximo 250 caracteres")]
        public string? Descricao { get; set; }

        public ICollection<Chamado> Chamados { get; set; } = new List<Chamado>();
    }
}