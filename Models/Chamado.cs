using System.ComponentModel.DataAnnotations;
using TicketFlow.API.Enums;

namespace TicketFlow.API.Models
{
    public class Chamado
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(150)]
        public string Titulo { get; set; } = string.Empty;

        [Required]
        [MaxLength(1000)]
        public string Descricao { get; set; } = string.Empty;

        [Required]
        public PrioridadeChamado Prioridade { get; set; }

        [Required]
        public StatusChamado Status { get; set; } = StatusChamado.Aberto;

        public DateTime DataAbertura { get; set; } = DateTime.Now;

        public DateTime? DataAtualizacao { get; set; }

        [Required]
        public int UsuarioId { get; set; }

        public Usuario? Usuario { get; set; }

        [Required]
        public int CategoriaId { get; set; }

        public Categoria? Categoria { get; set; }

        public int? TecnicoResponsavelId { get; set; }

        public Usuario? TecnicoResponsavel { get; set; }
    }
}