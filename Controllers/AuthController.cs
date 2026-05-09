using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketFlow.API.Data;
using TicketFlow.API.DTOs;
using TicketFlow.API.Services;

namespace TicketFlow.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly TokenService _tokenService;

        public AuthController(AppDbContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginResponseDto>> Login(LoginRequestDto dto)
        {
            var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == dto.Email);

            if (usuario == null)
            {
                return Unauthorized("Email ou senha incorretos.");
            }

            bool senhaValida = false;
            try 
            {
                senhaValida = BCrypt.Net.BCrypt.Verify(dto.Senha, usuario.Senha);
            } 
            catch 
            {
                // Fallback para caso existam senhas em plain text no banco de dados antigo
                senhaValida = usuario.Senha == dto.Senha;
            }

            if (!senhaValida)
            {
                return Unauthorized("Email ou senha incorretos.");
            }

            var token = _tokenService.GerarToken(usuario);

            var usuarioDto = new UsuarioResponseDto
            {
                Id = usuario.Id,
                Nome = usuario.Nome,
                Email = usuario.Email,
                Perfil = usuario.Perfil,
                DataCriacao = usuario.DataCriacao
            };

            var response = new LoginResponseDto
            {
                Token = token,
                Usuario = usuarioDto
            };

            return Ok(response);
        }
    }
}
