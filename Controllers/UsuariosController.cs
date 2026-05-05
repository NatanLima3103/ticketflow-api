using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketFlow.API.Data;
using TicketFlow.API.DTOs;
using TicketFlow.API.Models;

namespace TicketFlow.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsuariosController(AppDbContext context)
        {
            _context = context;
        }

        private static UsuarioResponseDto ConverterParaDto(Usuario usuario)
        {
            return new UsuarioResponseDto
            {
                Id = usuario.Id,
                Nome = usuario.Nome,
                Email = usuario.Email,
                Perfil = usuario.Perfil,
                DataCriacao = usuario.DataCriacao
            };
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UsuarioResponseDto>>> Listar()
        {
            var usuarios = await _context.Usuarios
                .Select(usuario => ConverterParaDto(usuario))
                .ToListAsync();

            return Ok(usuarios);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UsuarioResponseDto>> BuscarPorId(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);

            if (usuario == null)
            {
                return NotFound("Usuário não encontrado.");
            }

            return Ok(ConverterParaDto(usuario));
        }

        [HttpPost]
        public async Task<ActionResult<UsuarioResponseDto>> Criar(UsuarioCreateDto dto)
        {
            var usuario = new Usuario
            {
                Nome = dto.Nome,
                Email = dto.Email,
                Senha = dto.Senha,
                Perfil = dto.Perfil
            };

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            var usuarioResponse = ConverterParaDto(usuario);

            return CreatedAtAction(nameof(BuscarPorId), new { id = usuario.Id }, usuarioResponse);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Atualizar(int id, UsuarioUpdateDto dto)
        {
            var usuario = await _context.Usuarios.FindAsync(id);

            if (usuario == null)
            {
                return NotFound("Usuário não encontrado.");
            }

            usuario.Nome = dto.Nome;
            usuario.Email = dto.Email;
            usuario.Perfil = dto.Perfil;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Excluir(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);

            if (usuario == null)
            {
                return NotFound("Usuário não encontrado");
            }

            _context.Usuarios.Remove(usuario);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}