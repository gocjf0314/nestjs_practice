import { SetMetadata, applyDecorators } from "@nestjs/common";

export function Auth(...roles: []) {
    return applyDecorators(
        SetMetadata('roles', roles),
        // UseGuards(AuhtGuard, RolesGuard),
        // ApiBearerAuth(),
        // ApiUnathroizedResponse({ description: 'Unauthorized' }),
    );
}