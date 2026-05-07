using System.ComponentModel.DataAnnotations;

namespace TicketFlow.API.DTOs
{
    public class CategoriaCreateDto
    {
        [Required]
        [MaxLength(80)]
        public string Nome { get; set; } = string.Empty;

        [MaxLength(250)]
        public string? Descricao { get; set; }
    }

    public class CategoriaUpdateDto
    {
        [Required]
        public int Id { get; set; }
        [MaxLength(80)]
        public string Nome { get; set; } = string.Empty;

        [MaxLength(250)]
        public string? Descricao { get; set; }
    }

    public class CategoriaResponseDto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string? Descricao { get; set; }
    }
}