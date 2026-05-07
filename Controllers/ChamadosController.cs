using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketFlow.API.Data;
using TicketFlow.API.DTOs;
using TicketFlow.API.Models;

namespace TicketFlow.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChamadosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ChamadosController(AppDbContext context)
        {
            _context = context;
        }

        private static ChamadoResponseDto ConverterParaDto(Chamado chamado)
        {
            return new ChamadoResponseDto
            {
                Id = chamado.Id,
                Titulo = chamado.Titulo,
                Descricao = chamado.Descricao,
                Prioridade = chamado.Prioridade,
                Status = chamado.Status,
                DataAbertura = chamado.DataAbertura,
                DataAtualizacao = chamado.DataAtualizacao,

                UsuarioId = chamado.UsuarioId,
                UsuarioNome = chamado.Usuario?.Nome,

                CategoriaId = chamado.CategoriaId,
                CategoriaNome = chamado.Categoria?.Nome,

                TecnicoResponsavelId = chamado.TecnicoResponsavelId,
                TecnicoResponsavelNome = chamado.TecnicoResponsavel?.Nome
            };
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ChamadoResponseDto>>> Listar()
        {
            var chamados = await _context.Chamados
                .Include(c => c.Usuario)
                .Include(c => c.Categoria)
                .Include(c => c.TecnicoResponsavel)
                .ToListAsync();

            var chamadosDto = chamados.Select(ConverterParaDto).ToList();

            return Ok(chamadosDto);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ChamadoResponseDto>> BuscarPorId(int id)
        {
            var chamado = await _context.Chamados
                .Include(c => c.Usuario)
                .Include(c => c.Categoria)
                .Include(c => c.TecnicoResponsavel)
                .FirstOrDefaultAsync(chamado => chamado.Id == id);

            if (chamado == null)
            {
                return NotFound();
            }

            return Ok(ConverterParaDto(chamado));
        }

        [HttpPost]
        public async Task<ActionResult<ChamadoResponseDto>> Criar(ChamadoCreateDto dto)
        {
            var chamado = new Chamado
            {
                Titulo = dto.Titulo,
                Descricao = dto.Descricao,
                Prioridade = dto.Prioridade,
                UsuarioId = dto.UsuarioId,
                CategoriaId = dto.CategoriaId,
                TecnicoResponsavelId = dto.TecnicoResponsavelId
            };

            _context.Chamados.Add(chamado);
            await _context.SaveChangesAsync();

            var chamadoCriado = await _context.Chamados
                .Include(c => c.Usuario)
                .Include(c => c.Categoria)
                .Include(c => c.TecnicoResponsavel)
                .FirstAsync(c => c.Id == chamado.Id);

            return CreatedAtAction(
                nameof(BuscarPorId),
                new { id = chamado.Id },
                ConverterParaDto(chamadoCriado)
            );
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Atualizar(int id, ChamadoUpdateDto dto)
        {
            if (id != dto.Id)
            {
                return BadRequest();
            }

            var chamado = await _context.Chamados.FindAsync(id);

            if (chamado == null)
            {
                return NotFound();
            }

            chamado.Titulo = dto.Titulo;
            chamado.Descricao = dto.Descricao;
            chamado.Prioridade = dto.Prioridade;
            chamado.Status = dto.Status;
            chamado.UsuarioId = dto.UsuarioId;
            chamado.CategoriaId = dto.CategoriaId;
            chamado.TecnicoResponsavelId = dto.TecnicoResponsavelId;
            chamado.DataAtualizacao = DateTime.Now;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Excluir(int id)
        {
            var chamado = await _context.Chamados.FindAsync(id);

            if (chamado == null)
            {
                return NotFound();
            }

            _context.Chamados.Remove(chamado);
            await _context.SaveChangesAsync();
            
            return NoContent();
        }
    }
}