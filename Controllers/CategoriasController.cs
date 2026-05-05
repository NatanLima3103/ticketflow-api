using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketFlow.API.Data;
using TicketFlow.API.Models;
using TicketFlow.API.DTOs;

namespace TicketFlow.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CategoriasController(AppDbContext context)
        {
            _context = context;
        }

        private static CategoriaResponseDto ConverterParaDto(Categoria categoria)
        {
            return new CategoriaResponseDto
            {
                Id = categoria.Id,
                Nome = categoria.Nome,
                Descricao = categoria.Descricao
            };
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoriaResponseDto>>> Listar()
        {
            var categorias = await _context.Categorias
                .Select(categoria => ConverterParaDto(categoria))
                .ToListAsync();

            return Ok(categorias);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CategoriaResponseDto>> BuscarPorId(int id)
        {
            var categoria = await _context.Categorias.FindAsync(id);

            if (categoria == null)
            {
                return NotFound("Categoria não encontrada.");
            }

            return Ok(ConverterParaDto(categoria));
        }

        [HttpPost]
        public async Task<ActionResult<CategoriaResponseDto>> Criar(CategoriaCreateDto dto)
        {
            var categoria = new Categoria
            {
                Nome = dto.Nome,
                Descricao = dto.Descricao
            };

            _context.Categorias.Add(categoria);
            await _context.SaveChangesAsync();

            var categoriaResponse = ConverterParaDto(categoria);

            return CreatedAtAction(nameof(BuscarPorId), new { id = categoria.Id }, categoriaResponse);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Atualizar(int id, CategoriaUpdateDto dto)
        {
            var categoria = await _context.Categorias.FindAsync(id);

            if (categoria == null)
            {
                return NotFound("Categoria não encontrada.");
            }

            categoria.Nome = dto.Nome;
            categoria.Descricao = dto.Descricao;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Excluir(int id)
        {
            var categoria = await _context.Categorias.FindAsync(id);

            if (categoria == null)
            {
                return NotFound("Categoria não encontrada.");
            }

            _context.Categorias.Remove(categoria);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}