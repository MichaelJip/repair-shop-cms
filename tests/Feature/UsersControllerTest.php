<?php

use App\Models\Roles;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->actingAs(User::factory()->create());
});

test('a user can be created with a role', function () {
    $mechanicRole = Roles::factory()->create(['name' => 'mechanic']);

    $this->post(route('users.store'), [
        'name' => 'Budi',
        'email' => 'budi@example.com',
        'role_id' => $mechanicRole->id,
        'password' => 'password-123!',
        'password_confirmation' => 'password-123!',
    ])->assertRedirect(route('users.index'));

    $user = User::where('email', 'budi@example.com')->firstOrFail();

    expect($user->role_id)->toBe($mechanicRole->id)
        ->and(Hash::check('password-123!', $user->password))->toBeTrue();
});

test('creating a user requires a role and a unique email', function () {
    $existing = User::factory()->create();

    $this->post(route('users.store'), [
        'name' => 'Budi',
        'email' => $existing->email,
        'password' => 'password-123!',
        'password_confirmation' => 'password-123!',
    ])->assertSessionHasErrors(['email', 'role_id']);
});

test('updating a user without a password keeps the current password', function () {
    $role = Roles::factory()->create();
    $user = User::factory()->create(['password' => 'old-password-1!']);
    $oldHash = $user->password;

    $this->put(route('users.update', $user), [
        'name' => 'Renamed',
        'email' => $user->email,
        'role_id' => $role->id,
        'password' => '',
        'password_confirmation' => '',
    ])->assertRedirect(route('users.index'));

    $user->refresh();

    expect($user->name)->toBe('Renamed')
        ->and($user->role_id)->toBe($role->id)
        ->and($user->password)->toBe($oldHash);
});

test('a user cannot delete their own account', function () {
    $me = User::factory()->create();

    $this->actingAs($me)
        ->delete(route('users.destroy', $me))
        ->assertSessionHasErrors('user');

    expect($me->fresh())->not->toBeNull();
});

test('another user can be deleted', function () {
    $other = User::factory()->create();

    $this->delete(route('users.destroy', $other));

    expect($other->fresh())->toBeNull();
});
