using System.ComponentModel.DataAnnotations;
using TicketFlow.API.Enums;

namespace TicketFlow.API.DTOs
{
    public class ChamadoCreateDto
    {
        [Required]
        [MaxLength(150)]
        public string Titulo { get; set; } = string.Empty;

        [Required]
        [MaxLength(1000)]
        public string Descricao { get; set; } = string.Empty;

        [Required]
        public PrioridadeChamado Prioridade { get; set; }

        [Required]
        public int UsuarioId { get; set; }

        [Required]
        public int CategoriaId { get; set; }

        public int? TecnicoResponsavelId { get; set;}
    }

    public class ChamadoUpdateDto
    {
        [Required]
        public int Id{ get; set; }

        [Required]
        [MaxLength(150)]
        public string Titulo { get; set; } = string.Empty;

        [Required]
        [MaxLength(1000)]
        public string Descricao { get; set; } = string.Empty;

        [Required]
        public PrioridadeChamado Prioridade { get; set; }

        [Required]
        public StatusChamado Status { get; set; }

        [Required]
        public int UsuarioId { get; set; }

        [Required]
        public int CategoriaId { get; set; }

        public int? TecnicoResponsavelId { get; set; }
    }

    public class ChamadoResponseDto
    {
        public int Id { get; set; }
        public string Titulo { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public PrioridadeChamado Prioridade { get; set; }
        public StatusChamado Status { get; set; }
        public DateTime DataAbertura { get; set; }
        public DateTime? DataAtualizacao { get; set; }

        public int UsuarioId { get; set; }
        public string? UsuarioNome { get; set; }

        public int CategoriaId { get; set; }
        public string? CategoriaNome { get; set; }

        public int? TecnicoResponsavelId { get; set; }
        public string? TecnicoResponsavelNome { get; set; }
    }
}