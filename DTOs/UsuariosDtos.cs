using System.ComponentModel.DataAnnotations;
using TicketFlow.API.Enums;

namespace TicketFlow.API.DTOs
{
    public class UsuarioCreateDto
    {
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
    }
    public class UsuarioUpdateDto
    {

        [Required]
        [MaxLength(100)]
        public string Nome { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [MaxLength(150)]
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