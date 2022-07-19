export enum CollaboratorRole {

	/**
	 * Grants all permissions to the sole owner of a repository.
	 */
	Owner = 'owner',

	/**
	 * Grants all permissions and the ability to invite other collaborators.
	 */
	Manager = 'manager',

	/**
	 * Grants read-only permissions.
	 */
	Auditor = 'auditor',

	/**
	 * Grants custom permission scopes from the `scopes` field in the collaboration row.
	 */
	Custom = 'custom'

};
