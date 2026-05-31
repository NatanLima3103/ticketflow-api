using System.ComponentModel.DataAnnotations;
using TicketFlow.API.Enums;

namespace TicketFlow.API.DTOs
{
    public class UsuarioCreateDto
    {
        [Required]
        [MaxLength(100, ErrorMessage = "Tamanho máximo 100 caracteres")]
        public string Nome { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [MaxLength(150, ErrorMessage = "Tamanho máximo 150 caracteres")]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MinLength(6, ErrorMessage = "Tamanho máximo 6 caracteres")]
        public string Senha { get; set; } = string.Empty;

        [Required]
        public PerfilUsuario Perfil { get; set; }
    }
    public class UsuarioUpdateDto
    {

        [Required]
        public int Id { get; set; }

        [Required]
        [MaxLength(100, ErrorMessage = "Tamanho máximo 100 caracteres")]
        public string Nome { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [MaxLength(150, ErrorMessage = "Tamanho máximo 150 caracteres")]
        public string Email { get; set; } = string.Empty;

        [Required]
        public PerfilUsuario Perfil { get; set; }
    }

    public class UsuarioResponseDto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public PerfilUsuario Perfil { get; set; }
        public DateTime DataCriacao { get; set; }
    }

}