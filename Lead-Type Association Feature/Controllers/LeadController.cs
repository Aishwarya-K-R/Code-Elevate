using LSQ.Interfaces;
using LSQ.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LSQ.Controllers
{
    [ApiController]
    [Route("api/")]
    public class LeadController(ILead leadService) : ControllerBase
    {
        private readonly ILead _leadService = leadService;

        [Authorize]
        [HttpGet("leads")]
        public async Task<IActionResult> GetLeads(
            string search = "",
            string sortCol = "Name",
            string sortDir = "desc",
            int pageNo = 1,
            int pageSize = 3
        )
        {   
            try
            {
                return Ok(await _leadService.GetLeads(search, sortCol, sortDir, pageNo, pageSize));
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [Authorize] 
        [HttpGet("lead/{id}")]
        public async Task<IActionResult> GetLeadById(int id)
        {
            try
            {
                return Ok(await _leadService.GetLeadById(id));
            }
            catch(KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("lead")]
        public async Task<IActionResult> AddLead([FromBody] Lead lead)
        {
            try
            {
                return CreatedAtAction(nameof(GetLeadById), new { id = lead.Id }, await _leadService.AddLead(lead));
            }
            catch(KeyNotFoundException ex)
            {
                return Conflict(ex);
            }
            catch(InvalidCastException ex)
            {
                return Conflict(ex);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("lead/{id}")]
        public async Task<IActionResult> UpdateLead(int id, [FromBody] Lead updatedLead)
        {
            try
            {
                return Ok(await _leadService.UpdateLead(id, updatedLead));
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (InvalidCastException ex)
            {
                return Conflict(ex);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("lead/{id}")]
        public async Task<IActionResult> DeleteLead(int id)
        {
            try
            {
                return Ok(await _leadService.DeleteLead(id));
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}