using System.Threading.Tasks;
using LSQ.Data;
using LSQ.Interfaces;
using LSQ.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LSQ.Controllers
{
    [ApiController]
    [Route("api/associations/")]
    public class AssociationController(IAssociation associationService) : ControllerBase
    {
        private readonly IAssociation _associationService = associationService;

        [Authorize]
        [HttpPost("primary")]
        public async Task<IActionResult> GetPrimaryAssociations([FromBody] Association association)
        {
            try
            {
                return Ok(await _associationService.GetPrimaryAssociations(association));
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [Authorize]
        [HttpPost("secondary")]
        public async Task<IActionResult> GetSecondaryAssociations([FromBody] Association association)
        {
            try
            {
                return Ok(await _associationService.GetSecondaryAssociations(association));
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);

            }
        }

        [Authorize]
        [HttpPost("count")]
        public async Task<IActionResult> GetAssociationCount([FromBody] Association association)
        {
            try
            {
                return Ok(await _associationService.GetAssociationCount(association));
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("create")]
        public async Task<IActionResult> CreateAssociations([FromBody] Association association)
        {
            try
            {
                return Ok(await _associationService.CreateAssociation(association));
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (InvalidDataException ex)
            {
                return NotFound(ex.Message);
            }
            catch (InvalidOperationException ex)
            {
                return NotFound(ex.Message);
            }
        }


        [HttpDelete("delete")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteAssociations([FromBody] Association association)
        {
            try
            {
                return Ok(await _associationService.DeleteAssociation(association));
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (InvalidDataException ex)
            {
                return NotFound(ex.Message);
            }
            catch (InvalidCastException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}