using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketFlow.API.Data;
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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Chamado>>> Listar()
        {
            return await _context.Chamados
                .Include(c => c.Usuario)
                .Include(c => c.Categoria)
                .Include(c => c.TecnicoResponsavel)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Chamado>> BuscarPorId(int id)
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

            return chamado;
        }

        [HttpPost]
        public async Task<ActionResult<Chamado>> Criar(Chamado chamado)
        {
            _context.Chamados.Add(chamado);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(BuscarPorId), new {id = chamado.Id}, chamado);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Atualizar(int id, Chamado chamado)
        {
            if (id != chamado.Id)
            {
                return BadRequest();
            }

            _context.Entry(chamado).State = EntityState.Modified;
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