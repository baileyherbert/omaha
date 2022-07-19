import { IsIn, IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class SearchReleasesDto {

	/**
	 * The page number of results to show.
	 * @default '1'
	 */
	@IsOptional()
	@IsNumberString()
	@IsNotEmpty()
	page?: number;

	/**
	 * The number of results to show per page. This can be set to `0` to show all results when `assets=1`.
	 * @default '25'
	 */
	@IsOptional()
	@IsNumberString()
	@IsNotEmpty()
	count?: number;

	/**
	 * Whether or not to include release assets in the results.
	 * @default '0'
	 */
	@IsOptional()
	@IsIn([ 'true', '1', 'false', '0' ])
	assets?: 'true' | '1' | 'false' | '0';

	/**
	 * Search for a version. This can be a semver constraint, version number, or tag name, and is checked in that order.
	 * @default ''
	 */
	@IsOptional()
	@IsString()
	constraint?: string;

	/**
	 * A comma-delimited list of release tags to include. When not specified or blank, all tags are included.
	 * @default '' // (all)
	 */
	@IsOptional()
	@IsString()
	tags?: string;

	/**
	 * The sorting algorithm to use for results.
	 * @default 'version'
	 */
	@IsOptional()
	@IsIn([ 'version', 'date' ])
	sort?: 'version' | 'date';

	/**
	 * The direction to use for the sorting algorithm.
	 * @default 'desc'
	 */
	@IsOptional()
	@IsIn([ 'desc', 'asc' ])
	sort_order?: 'desc' | 'asc';

}
