using System.ComponentModel.DataAnnotations;
using TicketFlow.API.Models;

namespace TicketFlow.API.DTOs
{
    public class LoginRequestDto
    {
        [Required(ErrorMessage = "O email é obrigatório")]
        [EmailAddress(ErrorMessage = "Formato de email inválido")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "A senha é obrigatória")]
        public string Senha { get; set; } = string.Empty;
    }

    public class LoginResponseDto
    {
        public string Token { get; set; } = string.Empty;
        public UsuarioResponseDto Usuario { get; set; } = default!;
    }
}
